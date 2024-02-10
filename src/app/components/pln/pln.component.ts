import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';  // Import the Router module
import { DataService } from 'src/app/services/data.service';
import axios from 'axios';

@Component({
  selector: 'app-pln',
  templateUrl: './pln.component.html',
  styleUrls: ['./pln.component.scss'],
  // ... animations and other metadata
})
export class PlnComponent implements OnInit {
  animationState = 'initial';
  fadeOutState = 'initial';
  fadeInState = 'initial';
  animationCompleted = false;

  isBillAktif: boolean = true;
  inputIdPel: string = '';
  inputName: string = '';
  selectedFavoriteIdPel: string = '';
  submitted: boolean = false;
  isSaveToFavoritesChecked: boolean = false;
  selectedIdPel: string = '';
  selectedRekening: string = '';
  rekeningOptions: { id: number; norek: string }[] = [];

  
  constructor(private router: Router, private dataService: DataService) {}
  // Inject the Router in the constructor  

  favoriteList: {idpel: string; name: string }[] = [];
    // Add more favorites as needed;

  onFavoriteSelected(favorite: { id: string; name: string }): void {
    this.selectedFavoriteIdPel = favorite.id;
  }
  
  isOptionSelected(): boolean {
    return this.selectedFavoriteIdPel !== null && this.selectedFavoriteIdPel !== '';
  }

  onSwitchButtonClick(isBillAktif: boolean) {
    this.isBillAktif = isBillAktif;
  }

  onRekeningSelectionChange(): void {
    // Panggil metode dari DataService untuk menyimpan nilai yang dipilih
    this.dataService.setSelectedRekening(this.selectedRekening);
  }

  onConfirmButtonClicked() {
    this.submitted = true;
    // Mengambil userId dari localStorage
    const userId = localStorage.getItem('userId');
    if (!userId) {
      console.error('User ID tidak ditemukan di localStorage');
      return;
    }
  
    // Mengambil idpel dari inputan HTML, ganti 'yourInputId' dengan id yang sesuai
    const idpel = this.inputIdPel.toString(); // Convert idpel to string explicitly
    console.log('IDPEL:', idpel);
    if (!idpel) {
      console.error('IDPEL tidak boleh kosong');
      return;
    }
  
    // Mengirim permintaan POST ke backend dengan Axios
    axios.post(`http://192.168.0.21:8080/api/bills/${userId}`, 
    idpel,
      {
        headers: {
          'Content-Type': 'text/plain',
        }
      }
    )
    .then(response => {
      // Tanggapan sukses dari backend
      console.log('Bill added successfully:', response.data);
      this.router.navigate(['/summarypln']);
      localStorage.setItem('idpel', this.inputIdPel);
    
      // Lakukan tindakan setelah berhasil menambahkan tagihan
    })
    .catch(error => {
      // Tanggapan error dari backend
      console.error('Failed to add bill:', error.response.data);
      // Lakukan tindakan penanganan kesalahan
    });
  }
  
  

  getCurrentDateString(): string {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = ('0' + (currentDate.getMonth() + 1)).slice(-2); // Adding 1 because months are zero-based
    const day = ('0' + currentDate.getDate()).slice(-2);

    return `${year}-${month}-${day}`;
  }

  
  // Metode untuk mendapatkan nilai idpel dari opsi yang dipilih di daftar favorit
  getSelectedIdPelFromFavorites(): string {
    // Anda perlu mengganti logika ini sesuai dengan bagaimana Anda mendapatkan nilai idpel dari opsi favorit.
    // Misalnya, jika Anda menyimpan nilai idpel favorit dalam properti di komponen, Anda dapat mengambilnya di sini.
    // Contoh: return this.selectedFavoriteIdpel;
  
    // Contoh sederhana: Mendapatkan nilai idpel dari elemen select di daftar favorit
    const selectElement = document.getElementById('favorit') as HTMLSelectElement;
    return selectElement.value || '';
  }

  getSelectedRekening(): string {
    // Anda perlu mengganti logika ini sesuai dengan bagaimana Anda mendapatkan nilai idpel dari opsi favorit.
    // Misalnya, jika Anda menyimpan nilai idpel favorit dalam properti di komponen, Anda dapat mengambilnya di sini.
    // Contoh: return this.selectedFavoriteIdpel;
  
    // Contoh sederhana: Mendapatkan nilai idpel dari elemen select di daftar favorit
    const selectElement = document.getElementById('rekening') as HTMLSelectElement;
    return selectElement.value || '';
  }

  onCheckboxChange(event: any) {
    this.isSaveToFavoritesChecked = event.target.checked;
    if (!this.isSaveToFavoritesChecked) {
      this.inputName = '';
    } else {
      if (this.inputIdPel && this.inputName) {
        const newFavorite = { idpel: this.inputIdPel, name: this.inputName };
        this.dataService.addToFavorites(newFavorite);
      }
    }
  }

  closeAlert(): void {
    this.submitted = false;
  }

  ngOnInit() {
    this.favoriteList = this.dataService.getFavorites();

    // Map the data to the expected format
    this.rekeningOptions = this.dataService.rekening.map(item => ({
      id: item.id_item,
      norek: item.norek
    })) || [];

    // Set default value
    const defaultRekening = this.rekeningOptions.find(option => option.id === 1);
    this.selectedRekening = defaultRekening ? defaultRekening.norek : '';
  }

  ngAfterViewInit() {
    this.toggleImageAnimation();
  }

  toggleImageAnimation() {
    this.animationState = this.animationState === 'initial' ? 'up' : 'initial';
    this.fadeOutState = this.fadeOutState === 'initial' ? 'fadeOut' : 'initial';
    this.fadeInState = this.fadeInState === 'initial' ? 'fadeIn' : 'initial';
  }

  animationDone() {
    this.animationCompleted = true;
  }

}
