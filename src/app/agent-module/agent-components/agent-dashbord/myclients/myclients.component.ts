import { Component, OnInit } from '@angular/core';
import { AgentServiceService } from 'src/app/agent-module/agent-services/agent-service.service';
import { PageEvent } from '@angular/material/paginator';
@Component({
  selector: 'app-myclients',
  templateUrl: './myclients.component.html',
  styleUrls: ['./myclients.component.css'],
})
export class MyclientsComponent implements OnInit {
  constructor(private agentService: AgentServiceService) {}
  Clients: any;
  pageSlice: any;
  lenght: any;
  ngOnInit(): void {
    this.agentService.getClients().subscribe(
      (res) => {
        this.Clients = res;
        console.log(res);

        this.pageSlice = this.Clients.slice(0, 3);
        this.lenght = this.Clients.length;
      },
      (err: any) => {
        console.log(err.error);
      }
    );
  }
  OnPageChange(event: PageEvent) {
    const start = event.pageIndex * event.pageSize;
    let end = start + event.pageSize;
    if (end > this.Clients.length) {
      end = this.Clients.length;
    }
    this.pageSlice = this.Clients.slice(start, end);
  }
  search($event: any) {
    this.agentService.getsearchClient($event).subscribe(
      (res: any) => {
        this.Clients = res;

        this.pageSlice = this.Clients.slice(0, 3);
        this.lenght = this.Clients.length;
      },
      (err: any) => {
        console.log(err.error);
      }
    );
  }
}
