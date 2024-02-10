import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import axios from 'axios';

@Component({
  selector: 'app-summarypln',
  templateUrl: './summarypln.component.html',
  styleUrls: ['./summarypln.component.scss']
})
export class SummaryplnComponent implements OnInit {
  animationState = 'initial';
  fadeOutState = 'initial';
  fadeInState = 'initial';
  animationCompleted = false;
  isBillAktif: boolean = true;
  idpel: string = '';
  password: string = '';
  showPassword: boolean = false;
  rekening: string = '';
  submitted: boolean = false;   // Add a property to store the password
  latestPaidBill: any;

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      console.error('User ID tidak ditemukan di localStorage');
      return;
    }
    // Mengirim permintaan GET ke backend dengan Axios
    axios.get(`http://192.168.0.21:8080/api/bills/latest-unpaid-bills/${userId}/single`)
      .then(response => {
        // Tanggapan sukses dari backend
        this.latestPaidBill = response.data;
        localStorage.setItem('id', this.latestPaidBill.id);
        
      })
      .catch(error => {
        // Tanggapan error dari backend
        console.error('Failed to fetch latest paid bill:', error.response.data);
      });
  
  }

  onConfirmButtonClicked() {
    // this.submitted = true;
    
    const billId = localStorage.getItem('id')
    const userId = localStorage.getItem('userId');
    console.log('id dari summarypln ->>',billId)

    const password = this.password.toString(); // Convert idpel to string explicitly
    console.log('Password:', password);
    if (!password) {
      console.error('Password tidak boleh kosong');
      return;
    }
      
    // Kirim permintaan PUT ke backend dengan Axios
    axios.put(`http://192.168.0.21:8080/api/bills/${billId}/update-payment-status`, password,
    {
      headers: {
        'Content-Type': 'text/plain',
      }
    }
  )
    .then(response => {
      // Tanggapan sukses dari backend
      console.log('Payment status updated successfully:', response.data);
      axios.post(`http://192.168.0.21:8080/api/users/${userId}/run-script-after-bill`)
        .then(postResponse => {
          // Tanggapan sukses dari panggilan POST
          console.log('Script executed after bill:', postResponse.data);
          // Lakukan redirect ke halaman buktibayar
          this.router.navigate(['/buktibayar']);
        })
        .catch(postError => {
          // Tanggapan error dari panggilan POST
          console.error('Failed to execute script after bill:', postError.response.data);
          // Lakukan tindakan penanganan kesalahan
        });
      // Lakukan tindakan setelah berhasil memperbarui status pembayaran
    })
    .catch(error => {
      // Tanggapan error dari backend
      console.error('Failed to update payment status:', error.response.data);
      // Lakukan tindakan penanganan kesalahan
    });
  }

  onSwitchButtonClick(isBillAktif: boolean) {
    this.isBillAktif = isBillAktif;
  }

  getSelectedRekening(): string {
    // Anda perlu mengganti logika ini sesuai dengan bagaimana Anda mendapatkan nilai idpel dari opsi favorit.
    // Misalnya, jika Anda menyimpan nilai idpel favorit dalam properti di komponen, Anda dapat mengambilnya di sini.
    // Contoh: return this.selectedFavoriteIdpel;
  
    // Contoh sederhana: Mendapatkan nilai idpel dari elemen select di daftar favorit
    const selectElement = document.getElementById('rekening') as HTMLSelectElement;
    return selectElement.value || '';
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }
  
  ngAfterViewInit() {
    this.toggleImageAnimation();
  }
  
  toggleImageAnimation() {
    this.animationState = (this.animationState === 'initial') ? 'up' : 'initial';
    this.fadeOutState = (this.fadeOutState === 'initial') ? 'fadeOut' : 'initial';
    this.fadeInState = (this.fadeInState === 'initial') ? 'fadeIn' : 'initial';
  }

  animationDone() {
    this.animationCompleted = true;
  }
}
