import {
    AddIcon,
    Box,
    Button, ButtonText,
    Fab, FabIcon,
    Heading,
    HStack,
    Icon,
    Input, InputField,
    Modal, ModalBackdrop,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    Text,
    VStack
} from '@gluestack-ui/themed';
import { useRouter } from 'expo-router';
import { ChevronRight, MapPin, Store as StoreIcon, Trash2 } from 'lucide-react-native';
import React, { useState } from 'react';
import { FlatList, Pressable } from 'react-native';
import { useStore } from '../store/useStore';

export default function StoreListScreen() {
  const router = useRouter();
  const { stores, addStore, removeStore } = useStore();
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');

  const handleSave = () => {
    if (name.trim() && address.trim()) {
      addStore(name, address);
      setName(''); setAddress(''); setShowModal(false);
    }
  };

  return (
    <Box flex={1} style={{ backgroundColor: '#F9F7F5' }}>
      <Box p="$10" pt="$20" alignItems="center">
        <Heading size="xl" textAlign="center" style={{ color: '#2D241E', letterSpacing: 1, fontWeight: '800' }}>
          CADASTRO DE LOJAS E PRODUTOS
        </Heading>
        <Text size="xs" style={{ color: '#8A7A71', letterSpacing: 1, marginTop: 4 }}>
          SISTEMA DE GESTÃO PATRIMONIAL
        </Text>
      </Box>

      <FlatList
        data={stores}
        contentContainerStyle={{ padding: 24 }}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Pressable onPress={() => router.push({ pathname: "/store/[id]", params: { id: item.id } } as any)}>
            <Box style={{ backgroundColor: '#FFFFFF', borderRadius: 20 }} p="$6" mb="$5" hardShadow="1">
              <HStack justifyContent="space-between" alignItems="center">
                <VStack space="xs" style={{ flex: 1 }}>
                  <Heading size="md" style={{ color: '#2D241E' }}>{item.name}</Heading>
                  <HStack space="xs" alignItems="center">
                    <Icon as={MapPin} size="xs" color="#8A7A71" />
                    <Text size="xs" style={{ color: '#8A7A71' }}>{item.address}</Text>
                  </HStack>
                </VStack>
                <HStack space="lg" alignItems="center">
                  <Pressable onPress={() => removeStore(item.id)} hitSlop={10}>
                    <Icon as={Trash2} color="#D1C7C1" size="sm" />
                  </Pressable>
                  <Icon as={ChevronRight} color="#2D241E" />
                </HStack>
              </HStack>
            </Box>
          </Pressable>
        )}
      />

      <Fab size="lg" placement="bottom right" onPress={() => setShowModal(true)} style={{ backgroundColor: '#42362E' }}>
        <FabIcon as={AddIcon} />
      </Fab>

      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <ModalBackdrop />
        <ModalContent style={{ borderRadius: 32, backgroundColor: '#FFFFFF' }} p="$4">
          <ModalHeader borderBottomWidth="$0" justifyContent="center">
             <VStack alignItems="center" space="md" py="$4">
                <Box p="$3" style={{ backgroundColor: '#F4F1EE', borderRadius: 12 }}>
                   <Icon as={StoreIcon} style={{ color: '#2D241E' }} />
                </Box>
                <Heading size="xl" style={{ color: '#2D241E' }}>Nova Loja</Heading>
             </VStack>
          </ModalHeader>
          <ModalBody>
            <VStack space="xl">
              <VStack space="xs">
                <Text size="xs" fontWeight="$bold" style={{ color: '#2D241E' }}>NOME DA UNIDADE</Text>
                <Input style={{ backgroundColor: '#F4F1EE', borderWidth: 0, borderRadius: 12, height: 55 }}>
                  <InputField placeholder="Ex: Unidade Centro" value={name} onChangeText={setName} />
                </Input>
              </VStack>
              <VStack space="xs">
                <Text size="xs" fontWeight="$bold" style={{ color: '#2D241E' }}>ENDEREÇO</Text>
                <Input style={{ backgroundColor: '#F4F1EE', borderWidth: 0, borderRadius: 12, height: 55 }}>
                  <InputField placeholder="Rua Exemplo, 123" value={address} onChangeText={setAddress} />
                </Input>
              </VStack>
            </VStack>
          </ModalBody>
          <ModalFooter borderTopWidth="$0">
            <Button onPress={handleSave} style={{ backgroundColor: '#42362E', borderRadius: 12, width: '100%', height: 55 }}>
              <ButtonText>Cadastrar Unidade →</ButtonText>
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}