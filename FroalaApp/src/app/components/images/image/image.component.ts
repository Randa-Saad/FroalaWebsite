import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize } from 'rxjs/operators';
import { ImageService } from '../../../shared/services/image.service';
import * as moment from 'moment';
@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.css'],
})
export class ImageComponent implements OnInit {
  imgSrc!: string;
  selectedImage: any = null;
  isSubmitted!: boolean;
  today: string = moment().format('D MMM YYYY');
  formTemplate = new FormGroup({
    title: new FormControl('', Validators.required),
    imageUrl: new FormControl('', Validators.required),
    date: new FormControl(''),
  });

  constructor(
    private storage: AngularFireStorage,
    private service: ImageService
  ) {}

  ngOnInit() {
    this.resetForm();
  }

  showPreview(event: any) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e: any) => (this.imgSrc = e.target.result);
      reader.readAsDataURL(event.target.files[0]);
      this.selectedImage = event.target.files[0];
    } else {
      this.imgSrc = '/assets/img/image_placeholder.jpg';
      this.selectedImage = null;
    }
  }

  onSubmit(formValue) {
    this.isSubmitted = true;
    var path = 'imagespath';
    if (this.formTemplate.valid) {
      var filePath = `${path}/${this.selectedImage.name
        .split('.')
        .slice(0, -1)
        .join('.')}_${new Date().getTime()}`;
      const fileRef = this.storage.ref(filePath);
      this.storage
        .upload(filePath, this.selectedImage)
        .snapshotChanges()
        .pipe(
          finalize(() => {
            fileRef.getDownloadURL().subscribe((url: any) => {
              formValue['imageUrl'] = url;
              this.service.insertImageDetails(formValue);
              this.resetForm();
            });
          })
        )
        .subscribe();
    }
  }

  get formControls() {
    return this.formTemplate['controls'];
  }

  resetForm() {
    this.formTemplate.reset();
    this.formTemplate.setValue({
      title: '',
      imageUrl: '',
      date: this.today,
    });
    this.imgSrc = '/assets/img/image_placeholder.jpg';
    this.selectedImage = null;
    this.isSubmitted = false;
  }
}
