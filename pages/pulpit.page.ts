import { Page } from '@playwright/test';
import { SideMenuComponent } from '../components/side-menu.component';

export class PulpitPage {
  constructor(private page: Page) {}

  // side-menu component
  sideMenu = new SideMenuComponent(this.page);

  // quick transfer feature
  transferReceiverId = this.page.locator('#widget_1_transfer_receiver');
  transferAmountInput = this.page.locator('#widget_1_transfer_amount');
  transferTitleInput = this.page.locator('#widget_1_transfer_title');
  transferButton = this.page.getByRole('button', { name: 'wykonaj' });
  transferPopupButton = this.page.getByTestId('close-button');

  confirmationMessage = this.page.locator('#show_messages');

  //mobile topup feature
  topupReceiverNumber = this.page.locator('#widget_1_topup_receiver');
  topupTransferAmount = this.page.locator('#widget_1_topup_amount');
  topupAgreementCheckbox = this.page.locator(
    '#uniform-widget_1_topup_agreement span',
  );
  topupButton = this.page.getByRole('button', { name: 'doładuj telefon' });
  topupPopupButton = this.page.getByTestId('close-button');

  moneyValueText = this.page.locator('#money_value');
  userNameText = this.page.getByTestId('user-name');

  async executeQuickPayment(
    receiverId: string,
    transferAmount: string,
    transferTitle: string,
  ): Promise<void> {
    await this.transferReceiverId.selectOption(receiverId);
    await this.transferAmountInput.fill(transferAmount);
    await this.transferTitleInput.fill(transferTitle);
    await this.transferButton.click();
    await this.transferPopupButton.click();
  }
  async executeMobileTopUp(
    receiverNumber: string,
    transferAmount: string,
  ): Promise<void> {
    await this.topupReceiverNumber.selectOption(receiverNumber);
    await this.topupTransferAmount.fill(transferAmount);
    await this.topupAgreementCheckbox.click();
    await this.topupButton.click();
    await this.topupPopupButton.click();
  }
}
