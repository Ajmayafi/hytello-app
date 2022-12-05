import React, { useState } from "react";
import { View } from 'react-native';
import { Button, Paragraph, Dialog, Portal } from 'react-native-paper';

export const NewErrorComponent = ({ error, inputError }) => {
     const [visible, setVisible] = React.useState(false); 


    const hideDialog = () => setVisible(false);

  useState(() => {
   setVisible(true)
  }, [error, inputError])

    return (
        <View>
          <Portal>
            <Dialog visible={visible} onDismiss={hideDialog}>
              <Dialog.Title>Alert</Dialog.Title>
              <Dialog.Content>
                {error && (<Paragraph>{String(error)}</Paragraph> )}

    {inputError && ( <Paragraph>{inputError}</Paragraph> 
    )}                
              </Dialog.Content>
              <Dialog.Actions>
                <Button onPress={hideDialog}>Ok</Button>
              </Dialog.Actions>
            </Dialog>
          </Portal>
        </View>
    )
}