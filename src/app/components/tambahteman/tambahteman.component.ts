import { Component, OnInit } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';
import { TemanService } from 'src/app/services/teman.service';
import { ChangeDetectorRef } from '@angular/core';
import { SelectedFriendsService } from 'src/app/services/selectedFriends.service';
import { Router } from '@angular/router';
import { Teman } from 'src/app/model/teman.model';

@Component({
  selector: 'app-tambahteman',
  templateUrl: './tambahteman.component.html',
  styleUrls: ['./tambahteman.component.scss'],
  template: `
  <img [src]="temanService.getRandomImage()" alt="Random Image" />
`
})
export class TambahtemanComponent implements OnInit {
  teman: any = {};
  temanList: any[] = [];
  showPopup = false;
  kataKunciPencarian = '';
  filteredTemanList: any[] = [];
  isInputFocused = false;
  selectedFriends: any[] = [];
  errorMessage: string = '';
  shakeError: boolean = false;
  randomImage: string = '';
  selectedFriendsToShow: any[] = [];
  public currentImageIndex: number = 0;

  public lastGeneratedId: number = 0;
 // constructor(public temanService: TemanService) {}
 //tambahan naufal
 constructor(public cdRef: ChangeDetectorRef, public temanService: TemanService, public selectedFriendsService: SelectedFriendsService,public router: Router) {}
 //

  openPopup(): void {
    //this.selectedFriendsService.clearSelectedFriends();
    this.showPopup = true;
  }

  closePopup(): void {
    this.showPopup = false;
    this.resetSearch();
  }
  
  public resetState() : void {
    this.selectedFriendsToShow = []
  }

  ngOnInit(): void {
    // Mendapatkan daftar teman dari TemanService
    // this.selectedFriendsToShow = this.temanService.getSelectedFriends();
    this.randomImage = this.temanService.getRandomImage();
    this.temanList = this.temanService.getTemanList();
    this.refreshFilteredTemanList();
    this.resetState()
    //tambahan naufal
    this.temanService.getTemanListFromBackend().subscribe(
      (data: any[]) => {
        console.log("ISITEMANBAWAH",this.temanList = data);
        this.refreshFilteredTemanList();
      },
      (error) => {
        console.error('Gagal memuat daftar teman:', error);
      }
    );

    this.selectedFriendsToShow = this.temanService.getSelectedFriendsToShow();
    //
  }


  simpanTeman(): void {
    if (!this.teman.name || !this.teman.noTelp) {
        this.errorMessage = 'Nama dan Nomor WhatsApp harus diisi!';
        this.shakeError = true;

        setTimeout(() => {
            this.shakeError = false;
        }, 800); // Sesuaikan dengan durasi animasi
        return;
    }

    if (this.teman.name.length > 10) {
        this.errorMessage = 'Maksimal 10 Karakter';
        this.shakeError = true;
        return;
    }

    // Bersihkan pesan kesalahan jika validasi berhasil
    this.errorMessage = '';
    this.shakeError = false;

    // Tentukan gambar acak untuk teman baru
    this.teman.imgSrc = this.temanService.getRandomImage();

    // Simpan teman ke backend menggunakan TemanService
    this.temanService.simpanTeman(this.teman).subscribe(
        (response) => {
            console.log('Teman berhasil disimpan:', response);
            console.log("TEMAN RESPON", response)

            // Refresh daftar teman yang ditampilkan
            this.temanService.getTemanListFromBackend().subscribe(
                (data: Teman[]) => {
                    this.temanList = data;
                    this.refreshFilteredTemanList();
                    this.selectedFriendsToShow = this.temanService.getSelectedFriendsToShow();
                },
                (error) => {
                    console.error('Gagal memuat daftar teman:', error);
                }
            );

            // Reset the friend object
            this.teman = {};

            // Close the popup
            this.closePopup();
        },
        (error) => {
            console.error('Gagal menyimpan teman di database:', error);
        }
    );

    // Refresh the filtered friend list
    this.refreshFilteredTemanList();

    // Log the updated temanList
    console.log("Teman List", this.temanList);
  }

  
  //tamabahan naufal
  saveSelectedFriends(): void {
    // Ambil ID teman-teman yang dipilih
    const selectedFriendIds = this.selectedFriends.map((friend) => friend.id_user);
  
    // Panggil layanan SelectedFriendsService untuk mendapatkan teman berdasarkan ID
    this.selectedFriendsService.getFriendsByIds(selectedFriendIds).subscribe(
      (selectedFriends: Teman[]) => {
        console.log('Inside getFriendsByIds success callback');
        // Menyimpan teman yang dipilih ke service
        this.selectedFriendsService.setSelectedFriends(selectedFriends);
        console.log('Before navigating to the next page');
        // Navigasi ke halaman berikutnya atau lakukan tindakan lain sesuai kebutuhan
        this.cdRef.detectChanges();
        this.router.navigate(['/summarybill']);
        console.log('After navigating to the next page');
      },
      (error) => {
        console.error('Gagal memuat teman yang dipilih:', error);
      }
    );
    console.log('After getFriendsByIds');
  }

  //


  generateUserId(): number {
    // Increment lastGeneratedId and return the new value
    this.lastGeneratedId += 1;
    return this.lastGeneratedId;
  }


  validasiNama(): void {
    if (this.teman.name && this.teman.name.length > 10) {
      this.errorMessage = 'Maksimal 10 Karakter';
      this.shakeError = true;
    } else {
      this.errorMessage = '';
      this.shakeError = false;
    }
  }

  cariTeman(): void {
    if (this.kataKunciPencarian.trim() !== '') {
      this.filteredTemanList = this.temanList.filter((teman) =>
        teman.name.toLowerCase().includes(this.kataKunciPencarian.toLowerCase())
      );
    } else {
      this.refreshFilteredTemanList();
    }
  }

  // deleteTeman(teman: any): void {
  //   // const index = this.temanList.findIndex(t => t.id === teman.id);

  //   // if (index !== -1) {
  //   //   // Hapus teman dari temanList
  //   //   this.temanList.splice(index, 1);

  //   //   // Hapus teman dari daftar yang dipilih jika ada
  //   //   const selectedFriendIndex = this.selectedFriends.findIndex(friend => friend.id === teman.id);
  //   //   if (selectedFriendIndex !== -1) {
  //   //     this.selectedFriends.splice(selectedFriendIndex, 1);
  //   //   }

  //   //   // Perbarui daftar teman yang ditampilkan
  //   //   this.refreshFilteredTemanList();
  //   // }

  //   const index = this.temanList.findIndex((t) => t.id === teman.id);

  //   if (index !== -1) {
  //     // Hapus teman dari temanList
  //     this.temanList.splice(index, 1);

  //     // Hapus teman dari daftar yang dipilih jika ada
  //     const selectedFriendIndex = this.selectedFriends.findIndex(
  //       (friend) => friend.id === teman.id
  //     );
  //     if (selectedFriendIndex !== -1) {
  //       this.selectedFriends.splice(selectedFriendIndex, 1);

  //       // Hapus teman dari daftar yang ditampilkan
  //       const selectedFriendToShowIndex = this.selectedFriendsToShow.findIndex(
  //         (friend) => friend.id === teman.id
  //       );
  //       if (selectedFriendToShowIndex !== -1) {
  //         this.selectedFriendsToShow.splice(selectedFriendToShowIndex, 1);
  //       }
  //     }

  //     // Perbarui daftar teman yang ditampilkan
  //     this.refreshFilteredTemanList();
  //   }
  // }

  batalPencarian(): void {
    this.kataKunciPencarian = '';
    this.refreshFilteredTemanList();
  }

  resetSearch(): void {
    this.kataKunciPencarian = '';
    this.refreshFilteredTemanList();
    this.errorMessage = '';
  }

  refreshFilteredTemanList(): void {
    this.filteredTemanList = [...this.temanList];
    this.selectedFriendsToShow = this.selectedFriendsToShow.filter((friend) =>
      this.filteredTemanList.includes(friend)
    );
  }

  onInputFocus(): void {
    this.isInputFocused = true;
  }

  onInputBlur(): void {
    this.isInputFocused = false;
  }

  selectFriend(teman: any): void {
    const index = this.selectedFriends.findIndex((friend) => friend === teman);

    if (index !== -1) {
      // Teman sudah ada di dalam daftar yang dipilih, hapus dari daftar
      this.selectedFriends.splice(index, 1);

      // Perbarui daftar teman yang ditampilkan
      this.selectedFriendsToShow = this.selectedFriends.slice(); // Membuat salinan untuk memastikan perubahan terdeteksi
    } else {
      // Teman belum ada di dalam daftar yang dipilih, tambahkan ke daftar
      this.selectedFriends.push(teman);

      // Perbarui daftar teman yang ditampilkan
      this.selectedFriendsToShow = this.selectedFriends.slice(); // Membuat salinan untuk memastikan perubahan terdeteksi
      // this.temanService.selectFriend(teman);
      this.temanService.setSelectedFriendsToShow(this.selectedFriends);
      console.log('teman',this.selectedFriendsToShow )
    }
    console.log("selectedFriendsToShow", this.selectedFriendsToShow);
  }
  

  unselectFriend(teman: any): void {
    const index = this.selectedFriends.findIndex((friend) => friend === teman);
    if (index !== -1) {
      // Teman sudah ada di dalam daftar yang dipilih, hapus dari daftar
      this.selectedFriends.splice(index, 1);
  
      // Hapus teman dari daftar yang ditampilkan dan hapus dari array selectedFriendsToShow
      const indexToShow = this.selectedFriendsToShow.findIndex(
        (friendToShow) => friendToShow === teman
      );
      if (indexToShow !== -1) {
        this.selectedFriendsToShow.splice(indexToShow, 1);
      }
    }
  }  

  sendDataToService(): void {
    // Call the method in TemanService to update selectedFriendsToShow
    this.temanService.setSelectedFriendsToShow(this.selectedFriendsToShow);
  }

  // Tambahkan metode ini untuk menentukan apakah suatu teman terpilih atau tidak
  isSelectedToShow(teman: any): boolean {
    return this.selectedFriendsToShow.includes(teman);
  }

  // getRandomImage(): string {
  //   const jumlah_gambar = 4;
  //   const nomor_acak = this.currentImageIndex % jumlah_gambar + 1;

  //   // Sesuaikan dengan struktur nama file gambar Anda
  //   const imagePath = `./assets/karakter/gambar_${nomor_acak}.svg`;

  //   // Pindahkan ke gambar berikutnya
  //   this.currentImageIndex = (this.currentImageIndex + 1) % jumlah_gambar;
  //   // console.log(imagePath)
  //   return imagePath;
  // }
}