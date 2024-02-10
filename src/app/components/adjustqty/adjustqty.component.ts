import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { Teman } from 'src/app/model/teman.model';
import { ItemService } from 'src/app/services/item.service';
import { TemanService } from 'src/app/services/teman.service';

@Component({
  selector: 'app-adjustqty',
  templateUrl: './adjustqty.component.html',
  styleUrls: ['./adjustqty.component.scss']
})
export class AdjustqtyComponent {
  imagePaths: string[] = [
    '../../../assets/karakter/gambar_4.svg',
    '../../../assets/karakter/gambar_2.svg',
    '../../../assets/karakter/gambar_2.svg',
    '../../../assets/karakter/gambar_3.svg',
    '../../../assets/karakter/gambar_1.svg',
    '../../../assets/karakter/gambar_2.svg',
  ];
  
  userId: string = '';
  idItem: string = '';
  count: number = 1;
  lastCount: number = 1;
  showLastCount: boolean = false;
  selectedFriends: Teman[] = [];
  data: { itemName: string; quantity: number; price: number }[] = [];

  constructor(private route: ActivatedRoute, private router: Router,  private dataService: DataService,private temanService: TemanService, ) {}

  increment() {
    this.count++;
  }

  decrement() {
    if (this.count > 1) {
      this.count--;
    }
  }

  save() {
    this.lastCount = this.count;
    this.showLastCount = true;
    this.dataService.setCount(this.idItem, this.lastCount);
    console.log(this.lastCount)
  }

  close() {
    this.showLastCount = false;
    this.count = this.dataService.getCount(this.idItem);
  }

  ngOnInit(): void {
    this.selectedFriends = this.temanService.getSelectedFriendsToShow();
    // this.data = this.dataService.getData();
    this.route.params.subscribe((params) => {
      this.idItem = params['idItem'] || '';
      console.log('Nama Item:', this.idItem);
      this.count = this.dataService.getCount(this.idItem);
      this.selectedFriends.forEach((friend) => {
        friend.userSelectedItems = { [this.userId]: [] };
      });
    });
  }
}
