import { NavesService } from './naves.service';
import { INave } from './../../core/models/naves.model';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EditNaveComponent } from './components/edit-nave/edit-nave.component';
import { AddNaveComponent } from './components/add-nave/add-nave.component';

@Component({
  selector: 'app-naves',
  templateUrl: './naves.component.html',
  styleUrls: ['./naves.component.scss']
})
export class NavesComponent implements OnInit {

  naves: INave[] = [];

  totalNaves: number;

  constructor(
    private navesService: NavesService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.cargarNaves(1);
  }

  cargarNaves(page: number): void {
    this.navesService.getNavesFromApi(page)
      .subscribe(response => {
        if (response) {
          this.naves = response.results;
          this.totalNaves = response.count;
        }
      });
  }

  crearNave(): void {
    const dialogRefResult = this.dialog.open(AddNaveComponent, {
      width: '700px'
    });
    dialogRefResult.afterClosed().subscribe(data => {
      if (data) {
        const newNavesList = [];
        newNavesList.push(data);
        this.naves.forEach(element => {
          newNavesList.push(element);
        });
        this.naves = newNavesList;
      }
    });
  }

  editarNave(nave: INave): void {
    this.dialog.open(EditNaveComponent, {
      width: '700px',
      data: nave
    });
  }


  onPageChange(event: any): void {
    this.cargarNaves(event.pageIndex + 1);
  }

}
