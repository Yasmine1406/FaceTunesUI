import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  @Output() startCamera: EventEmitter<void> = new EventEmitter<void>();

  public onClick(): void {
    if (this.startCamera) {
      this.startCamera.emit();
    }
  }

}
