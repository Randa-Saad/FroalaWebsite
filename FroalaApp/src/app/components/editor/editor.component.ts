import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';  
import { BrowserModule } from '@angular/platform-browser';
import { FroalaEditorModule } from 'angular-froala-wysiwyg';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { AuthService } from '../../shared/services/auth.service';
import { content } from '../../shared/services/content';
import {
  getFirestore,
  doc,
  setDoc,
  collection,
  getDocs,
  addDoc,
} from 'firebase/firestore';
import 'froala-editor/js/plugins.pkgd.min.js';
declare var $: any;

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css'],
})
export class EditorComponent implements OnInit {
  public WritingMode:boolean=false;
  private itemDoc: AngularFirestoreDocument<content>;
  public initControls;
  public SaveContent;
  ckeConfig: any;
  UserContent: string | undefined;
  editorContent = '';
  editorContents: Observable<any[]>;
  constructor(
    public authService: AuthService,
    firestore: AngularFirestore,
    public edit: FroalaEditorModule
  ) {
    this.editorContents = firestore.collection('editorContents').valueChanges();
    var User = JSON.parse(localStorage.getItem('user')!);
    var UserContent = this.editorContents.subscribe((data: any) => {
      for (var content of data) {
        if (content.uid == User.uid) {
          UserContent = content.contentitem;
          this.editorContent = content.contentitem;
        }
      }
    });
  }

  ngOnInit(): void {
    this.ckeConfig = {
      allowedContent: false,
      extraPlugins: 'divarea',
      forcePasteAsPlainText: true,
    };
    
  }

  public initialize(initControls) {
    this.initControls = initControls;
    let ContentKey = '';
    let update = 0;
    this.SaveContent = async function () {
      var NewContent = this.initControls.getEditor().html.get();
      var User = JSON.parse(localStorage.getItem('user')!);
      const item: content = {
        uid: User.uid,
        contentitem: NewContent,
      };
      const db = getFirestore();
      const colRef = collection(db, 'editorContents');
      const docsSnap = await getDocs(colRef);
      docsSnap.forEach((doc) => {
        if (doc.data().uid == User.uid) {
          update = 1;
          ContentKey = doc.id;
        }
      });
      if (update == 1) {
        let UpdatedContentRef = doc(db, 'editorContents', ContentKey);
        setDoc(UpdatedContentRef, item, { merge: true });
      } else {
        let NewContentRef = collection(db, 'editorContents');
        addDoc(NewContentRef, item);
      }
    };
  }
  EnableSave()
  {
    this.WritingMode=true;
  }
}
