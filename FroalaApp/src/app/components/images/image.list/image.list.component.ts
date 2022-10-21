import { Component, OnInit } from '@angular/core';
import {  AngularFireList } from '@angular/fire/compat/database';
import { ImageService } from '../../../shared/services/image.service';
import { getDatabase, ref,onValue } from "firebase/database";
@Component({
  selector: 'app-image.list',
  templateUrl: './image.list.component.html',
  styleUrls: ['./image.list.component.css']
})
export class ImageListComponent implements OnInit {
  imageList!: any[];
  rowIndexArray!: any[];
  imageDetailList: AngularFireList<any>;
  
  constructor(private service: ImageService) { }

  ngOnInit() {
    this.service.imageDetailList.snapshotChanges().subscribe(
      (      list: any[]) => {
        this.imageList = list.map(item => { return item.payload.val(); });
        this.rowIndexArray =  Array.from(Array(Math.ceil((this.imageList.length+1) / 3)).keys());
      }
    );
  }
Delete(value)
{
  const db = getDatabase();
  this.service.imageDetailList.snapshotChanges().subscribe(
    (data: any) => {
      for (var item of data)
       {
        const ImagePath = ref(db, 'imageDetails/' + item.key );
        onValue(ImagePath, (snapshot) => {
          const data = snapshot.val();
          if(data.title == value)
          {
            this.service.imageDetailList.remove(item.key);
          }
        });
      }
    });

  
}

}
