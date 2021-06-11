import { Component, ElementRef, ViewChild } from '@angular/core';
import {CdkDragDrop, CdkDragEnd, CdkDragRelease, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild("dragElement") dragElement: ElementRef;

  todos = [
    {
      name: 'Angular',
      category: 'Web Development'
    },
    {
      name: 'Flexbox',
      category: 'Web Development'
    },
    {
      name: 'iOS',
      category: 'App Development'
    },
    {
      name: 'Java',
      category: 'Software development'
    }
  ];

  completed = [
    {
      name: 'Android',
      category: 'Mobile Development'
    },
    {
      name: 'MongoDB',
      category: 'Databases'
    },
    {
      name: 'ARKit',
      category: 'Augmented Reality'
    },
    {
      name: 'React',
      category: 'Web Development'
    }
  ];

  onDrop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data,
        event.previousIndex,
        event.currentIndex);
        console.warn(event); 
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex, event.currentIndex);
        console.warn(event); 
    }
  }

  
  dragPosition = {x: 0, y: 0};
  onRelease(event: CdkDragRelease) {
      // console.log(event)
  }

  onDrops(event: CdkDragDrop<string[]>) {
    console.log(event);

  }

  dragEnd(event: CdkDragEnd) {
    // event.source.
    let x = event.source.getFreeDragPosition().x;
    let y = event.source.getFreeDragPosition().y
    this.dragPosition = {x: 201.5, y: 202.25};

    console.log(event.source.getFreeDragPosition());
    console.log(event)
    // console.log(this.dragElement.nativeElement.getBoundingClientRect());

  }


  changePosition() {
    this.dragPosition = {x: this.dragPosition.x + 50, y: this.dragPosition.y + 50};
    // console.log(this.dragElement);
    // console.log(this.dragPosition)
  }

}
