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
  ],
})
export class PaymentComponent implements OnInit {
  stripe!: Stripe;
  elements!: StripeElements;
  card!: StripeCardElement;
  paymentForm!: FormGroup;
  isProcessing = false;
  paymentStatus: string | null = null;

  // Replace with your Stripe publishable key (Test Key)
  private stripePublishableKey =
    'pk_test_51QjLARBROmvnBNkdEvNsvsfMEei6LiyaTJgNNaFh3emgjfCvRtJ3lzb0uMda7iBV635t0YVHJQ04o3SsCsACkWus00NhJ9EkCk';

  constructor(private fb: FormBuilder) {}

  async ngOnInit(): Promise<void> {
    this.initializeStripe();
    this.initializeForm();
  }

  async initializeStripe() {
    const stripe = await loadStripe(this.stripePublishableKey);
    if (!stripe) {
      throw new Error('Stripe failed to load');
    }
    this.stripe = stripe;
    this.elements = this.stripe.elements();
    this.card = this.elements.create('card');
    this.card.mount('#card-element');
  }

  initializeForm() {
    this.paymentForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
    });
  }

  async handlePayment() {
    if (!this.paymentForm.valid) {
      this.paymentStatus = 'Please complete the form.';
      return;
    }

    this.isProcessing = true;

    const { name, email } = this.paymentForm.value;

    // Mock PaymentIntent creation using Stripe's built-in logic
    const { error, paymentIntent } = await this.stripe.confirmCardPayment(
      'sk_test_51QjLARBROmvnBNkdNVEZY2qhdNPkMdfvHwu8LbpXaivH9nWhToq6kBB5iUAn2tbAxXvl38Um3CV0MY7zTdSIKApa00OQ4VdQoC', // Mock client_secret for practice
      {
        payment_method: {
          card: this.card,
          billing_details: {
            name,
            email,
          },
        },
      }
    );

    this.isProcessing = false;

    if (error) {
      this.paymentStatus = `Payment failed: ${error.message}`;
    } else if (paymentIntent?.status === 'succeeded') {
      this.paymentStatus = 'Payment succeeded!';
    }
  }
}
