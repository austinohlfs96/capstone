import { Modal } from 'semantic-ui-react';
import ConfirmEmail from './ConfirmEmail';
const ConfirmAppt = ({showPaymentModal, handlePaymentModalClose, calculateTotal, appointment}) => {
  return (
    <Modal open={showPaymentModal} onClose={handlePaymentModalClose}>
        <Modal.Header>Payment</Modal.Header>
          <Modal.Content>
        
          <p>Estimated Total: ${calculateTotal()}</p>
          <ConfirmEmail appointment={appointment}/>
          </Modal.Content>
        </Modal>
  )
}

export default ConfirmAppt;