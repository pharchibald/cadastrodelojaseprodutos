import {
    AddIcon,
    ArrowLeftIcon,
    Box,
    Button, ButtonText,
    Fab, FabIcon,
    Heading,
    HStack, Icon,
    Input, InputField,
    Modal, ModalBackdrop,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    Text,
    VStack
} from '@gluestack-ui/themed';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Tag, Trash2 } from 'lucide-react-native';
import React, { useState } from 'react';
import { FlatList, Pressable } from 'react-native';
import { useStore } from '../../store/useStore';

export default function ProductListScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const store = useStore((state) => state.stores.find(s => s.id === id));
  const { addProductToStore, removeProduct } = useStore();

  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');

  if (!store) return <Box flex={1} style={{ backgroundColor: '#F9F7F5' }} />;

  const handleSave = () => {
    const numericPrice = parseFloat(price.replace(',', '.'));
    if (name.trim() && !isNaN(numericPrice)) {
      addProductToStore(store.id, { name, category: 'Estoque', price: numericPrice });
      setName(''); setPrice(''); setShowModal(false);
    }
  };

  return (
    <Box flex={1} style={{ backgroundColor: '#F9F7F5' }}>
      {/* Header Premium - Corrigido do azul para Atelier */}
      <Box p="$10" pt="$20" style={{ backgroundColor: '#FFFFFF' }} hardShadow="1">
        <HStack space="md" alignItems="center">
          <Pressable onPress={() => router.back()}><Icon as={ArrowLeftIcon} color="#2D241E" /></Pressable>
          <VStack>
            <Heading size="md" style={{ color: '#2D241E', textTransform: 'uppercase' }}>{store.name}</Heading>
            <Text size="xs" style={{ color: '#8A7A71', fontWeight: 'bold' }}>CONTROLE DE INVENTÁRIO</Text>
          </VStack>
        </HStack>
      </Box>

      <FlatList
        data={store.products}
        contentContainerStyle={{ padding: 24 }}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Box style={{ backgroundColor: '#FFFFFF', borderRadius: 20 }} p="$6" mb="$4" hardShadow="1">
            <HStack justifyContent="space-between" alignItems="center">
              <VStack space="xs">
                <Text size="sm" fontWeight="$bold" style={{ color: '#2D241E' }}>{item.name}</Text>
                <Text size="xs" style={{ color: '#8A7A71' }}>REF: {item.id.slice(0,6).toUpperCase()}</Text>
              </VStack>
              <HStack space="lg" alignItems="center">
                <Text fontWeight="$bold" style={{ color: '#42362E' }}>R$ {Number(item.price || 0).toFixed(2)}</Text>
                <Pressable onPress={() => removeProduct(store.id, item.id)}><Icon as={Trash2} color="#D1C7C1" size="sm" /></Pressable>
              </HStack>
            </HStack>
          </Box>
        )}
      />

      <Fab size="lg" placement="bottom right" onPress={() => setShowModal(true)} style={{ backgroundColor: '#42362E' }}>
        <FabIcon as={AddIcon} />
      </Fab>

      {/* Modal de Produtos - Agora no estilo Atelier */}
      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <ModalBackdrop />
        <ModalContent style={{ borderRadius: 32, backgroundColor: '#FFFFFF' }} p="$4">
          <ModalHeader borderBottomWidth="$0" justifyContent="center">
             <VStack alignItems="center" space="md" py="$4">
                <Box p="$3" style={{ backgroundColor: '#F4F1EE', borderRadius: 12 }}><Icon as={Tag} style={{ color: '#2D241E' }} /></Box>
                <Heading size="xl" style={{ color: '#2D241E' }}>Novo Produto</Heading>
             </VStack>
          </ModalHeader>
          <ModalBody>
            <VStack space="xl">
              <VStack space="xs">
                <Text size="xs" fontWeight="$bold" style={{ color: '#2D241E' }}>DESCRIÇÃO</Text>
                <Input style={{ backgroundColor: '#F4F1EE', borderWidth: 0, borderRadius: 12, height: 55 }}>
                  <InputField placeholder="Nome do item" value={name} onChangeText={setName} />
                </Input>
              </VStack>
              <VStack space="xs">
                <Text size="xs" fontWeight="$bold" style={{ color: '#2D241E' }}>VALOR UNITÁRIO</Text>
                <Input style={{ backgroundColor: '#F4F1EE', borderWidth: 0, borderRadius: 12, height: 55 }}>
                  <InputField placeholder="0.00" keyboardType="numeric" value={price} onChangeText={setPrice} />
                </Input>
              </VStack>
            </VStack>
          </ModalBody>
          <ModalFooter borderTopWidth="$0">
            <Button onPress={handleSave} style={{ backgroundColor: '#42362E', borderRadius: 12, width: '100%', height: 55 }}>
              <ButtonText>Adicionar ao Estoque →</ButtonText>
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}