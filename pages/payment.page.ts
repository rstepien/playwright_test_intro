import { Page } from '@playwright/test';
import { SideMenuComponent } from '../components/side-menu.component';

export class PaymentPage {
  constructor(private page: Page) {}

  // side-menu component
  sideMenu = new SideMenuComponent(this.page);

  // payment feature
  transferReceiverInput = this.page.getByTestId('transfer_receiver');
  transferToInput = this.page.getByTestId('form_account_to');
  transferAmountInput = this.page.getByTestId('form_amount');
  transferButton = this.page.getByRole('button', { name: 'wykonaj przelew' });
  transferPopupButton = this.page.getByTestId('close-button');

  confirmationMessage = this.page.locator('#show_messages');
}
