import { Component, OnInit } from '@angular/core';
import { ImageService } from '../../shared/services/image.service';
@Component({
  selector: 'app-images',
  templateUrl: './images.component.html',
  styleUrls: ['./images.component.css'],
})
export class ImagesComponent implements OnInit {
  constructor(private service: ImageService) {}

  ngOnInit() {
    this.service.getImageDetailList();
  }
}
