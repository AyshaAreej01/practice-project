import { Component, OnInit } from '@angular/core';
import {
  loadStripe,
  Stripe,
  StripeElements,
  StripeCardElement,
} from '@stripe/stripe-js';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule
  ],
})
export class PaymentComponent implements OnInit {
  stripe!: Stripe;
  elements!: StripeElements;
  card!: StripeCardElement;
  paymentForm!: FormGroup;
  isProcessing = false;
  paymentStatus: string | null = null;
  countries = ['Pakistan', 'United States', 'Canada', 'United Kingdom'];

  private stripePublishableKey =
    'pk_test_51QjLARBROmvnBNkdEvNsvsfMEei6LiyaTJgNNaFh3emgjfCvRtJ3lzb0uMda7iBV635t0YVHJQ04o3SsCsACkWus00NhJ9EkCk';

  constructor(private fb: FormBuilder, private http: HttpClient) {}

  async ngOnInit(): Promise<void> {
    await this.initializeStripe();
    this.initializeForm();
  }

  async initializeStripe() {
    const stripeInstance = await loadStripe(this.stripePublishableKey);
    if (!stripeInstance) {
      throw new Error('Stripe failed to load');
    }
    this.stripe = stripeInstance;
    this.elements = this.stripe.elements();
    this.card = this.elements.create('card');
    this.card.mount('#card-element');
  }

  initializeForm() {
    this.paymentForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      amount: ['', [Validators.required, Validators.min(1)]]
    });
  }

  async handlePayment() {
   

    this.isProcessing = true;
    const { name, email, amount } = this.paymentForm.value;

    const response: any = await this.http
      .post(`${environment.API_BASE_URL}payments/create-payment-intent`, { amount: amount * 100, currency: 'usd' })
      .toPromise();

    const clientSecret = response.clientSecret;

    const { error, paymentIntent } = await this.stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: this.card,
        billing_details: { name, email },
      },
    });

    this.isProcessing = false;

    if (error) {
      this.paymentStatus = `Payment failed: ${error.message}`;
    } else if (paymentIntent?.status === 'succeeded') {
      this.paymentStatus = 'Payment succeeded!';
    }
  }
}
