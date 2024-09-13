import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MasterService } from './Service/master.service';
import { ApiResponseModel, ITask, Task } from './model/task';
import { DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, DatePipe, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'todo-list-angular';

  taskObj: Task =  new Task();

  taskList: ITask[] = [];

  masterService = inject(MasterService);

  ngOnInit(): void{
    this.loadAllTask();
  }

  loadAllTask(){
    this.masterService.getAllTaskList().subscribe((res: ApiResponseModel) =>{
      this.taskList = res.data;
    })
  }

  addTask(){
    this.masterService.addNewTask(this.taskObj).subscribe((res:ApiResponseModel) =>{
      if(res.result){
        alert('task created successfully');
        this.loadAllTask();
        this.taskObj = new Task();
      }
    }, error => {
    alert('API call error ')
  })
  
}

onDelete(id: number){
  const isConfirm = confirm('Are you sure you want to delete this task?');
  if(isConfirm){
    this.masterService.deleteTask(id).subscribe((res:ApiResponseModel)=>{
      if(res.result){
        alert('task deleted successfully');
        this.loadAllTask();
      }
    })
  }
 
}

}
