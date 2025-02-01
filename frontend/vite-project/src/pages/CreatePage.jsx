import { Box, Button, Container, FormControl, FormLabel, Heading, Input, useColorModeValue, VStack, useToast } from '@chakra-ui/react';
import React, { useState } from 'react';
import { useProductStore } from '../store/product';

const CreatePage = () => {
  const [newProduct, setNewProduct] = useState({
    name: '',
    price: '',
    image: '',
  });

  const toast = useToast();
  const { createProduct } = useProductStore();

  const handleAddProduct = async () => {
    const { success, message } = await createProduct(newProduct);
    if (!success) {
      toast({
        title: "Failed to create product",
        description: message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } else {
      toast({
        title: "Product created successfully",
        description: message,
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    }
    setNewProduct({ name: '', price: '', image: '' });
  };

  return (
    <Container maxW={"container.md"} py={12}>
      <VStack spacing={8}>
        <Heading as={"h1"} size={"2xl"} textAlign={"center"} mb={8}>
          Create a New Product
        </Heading>

        <Box
          w={"full"}
          bg={useColorModeValue("white", "gray.800")}
          shadow={"md"}
          rounded={"lg"}
          p={8}
        >
          <VStack spacing={4}>
            <FormControl id="name" isRequired>
              <FormLabel>Product Name</FormLabel>
              <Input
                placeholder='Product Name'
                name='name'
                value={newProduct.name}
                onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
              />
            </FormControl>

            <FormControl id="price" isRequired>
              <FormLabel>Product Price</FormLabel>
              <Input
                placeholder='Product Price'
                name='price'
                type='number'
                value={newProduct.price}
                onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
              />
            </FormControl>

            <FormControl id="image" isRequired>
              <FormLabel>Product Image URL</FormLabel>
              <Input
                placeholder='Product Image URL'
                name='image'
                value={newProduct.image}
                onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
              />
            </FormControl>

            <Button colorScheme='blue' onClick={handleAddProduct} w='full'>
              Add Product
            </Button>
          </VStack>
        </Box>
      </VStack>
    </Container>
  );
};

export default CreatePage;