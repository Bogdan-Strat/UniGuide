import { Modal, Input, FormControl, Button } from "native-base";
import * as Linking from 'expo-linking';

const PayModal = ({showModal, setShowModal}) => {
    return (
        <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <Modal.Content maxWidth="400px">
          <Modal.CloseButton />
          <Modal.Header>Add balance</Modal.Header>
          <Modal.Body>
            <FormControl>
              <FormControl.Label>Amount (€)</FormControl.Label>
              <Input rounded={'full'} keyboardType="numeric" placeholder="Enter the amount you want to add..." />
            </FormControl>
          </Modal.Body>
          <Modal.Footer>
            <Button.Group space={2}>
              <Button rounded={'full'} variant="ghost" colorScheme="blueGray" onPress={() => {
              setShowModal(false);
            }}>
                Cancel
              </Button>
              <Button rounded={'full'} onPress={() => {
                Linking.openURL('https://buy.stripe.com/test_eVa2c6eMegMofpSbIJ')
              setShowModal(false);
            }}>
                Go to payment
              </Button>
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    )
}

export default PayModal;