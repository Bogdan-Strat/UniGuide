import { Modal, Input, Radio, Button } from "native-base";
import * as Linking from 'expo-linking';
import { useState } from "react";

const PayModal = ({showModal, setShowModal}) => {
    const [value, setValue] = useState("1")

    return (
        <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <Modal.Content maxWidth="400px">
          <Modal.CloseButton />
          <Modal.Header>Add balance</Modal.Header>
          <Modal.Body>
          <Radio.Group value={value} onChange={setValue} name="myRadioGroup" accessibilityLabel="Pick your favorite number">
            <Radio value="1" my={1}>
              1 €
            </Radio>
            <Radio value="2" my={1}>
              2.5 €
            </Radio>
            <Radio value="3" my={1}>
              5 €
            </Radio>
        </Radio.Group>
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
            }}
            bgColor={'#3399ff'}
                        _pressed={{
                            bgColor: '#005fbd',
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