import { Component, ElementRef, NgZone, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { CdkDragDrop, CdkDragEnd, CdkDragRelease, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { ResizeEvent } from 'angular-resizable-element';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild("dragElement") dragElement: ElementRef;
  @ViewChildren('resizeBox') resizeBox?: QueryList<ElementRef>;


  constructor(private zone: NgZone) {

  }

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

  dragPosition;
  height;
  width;

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


  ngOnInit(): void {
    try {
      const position = JSON.parse(localStorage.getItem('position'));
      const defaultPosition = { x: 0, y: 0 }
      this.dragPosition = (position) ? position : defaultPosition;
    } catch (e) {

    }
  }


  onRelease(event: CdkDragRelease) {
    // console.log(event)
  }

  onDrops(event: CdkDragDrop<string[]>) {
    // console.log(event);

  }

  dragEnd(event: CdkDragEnd) {

    this.zone.runOutsideAngular(() => {
      const { offsetHeight, offsetWidth } = event.source.element.nativeElement;
      let { x, y } = event.source.getFreeDragPosition();
      this.dragPosition = { x: x, y: y };

      console.warn('after drag end', this.dragPosition);

      // this.height = offsetHeight;
      // this.width = offsetWidth;

      // localStorage.setItem("position", JSON.stringify(this.dragPosition));

      // console.log(event);

      // console.log(this.dragElement);
      // console.log(this.resizeBox);
    })


  }


  changePosition() {
    this.dragPosition = { x: this.dragPosition.x + 50, y: this.dragPosition.y + 50 };
    // console.log(this.dragElement);
    // console.log(this.dragPosition)
  }


  public style: object = {};

  validate(event: ResizeEvent): boolean {
    const MIN_DIMENSIONS_PX: number = 150;
    // console.log(event)
    if (
      event.rectangle.width &&
      event.rectangle.height &&
      (event.rectangle.width < MIN_DIMENSIONS_PX ||
        event.rectangle.height < MIN_DIMENSIONS_PX)
    ) {
      return false;
    }
    return true;
  }

  onResizeEnd(event: ResizeEvent): void {
    const current = this.dragPosition;
    console.log(event);
    
    this.style = {
      // position: 'absolute',
      // left: `${event.rectangle.left}px`,
      // top: `${event.rectangle.top}px`,
      // width: `${event.rectangle.width}px`,
      // height: `${event.rectangle.height}px`
    };

    // this.dragPosition = {x: 2, y: current.y};

  }







}
