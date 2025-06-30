import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList } from 'react-native';
import axios from 'axios';

export default function App() {
  const [name, setName] = useState('');
  const [role, setRole] = useState('learner');
  const [userId, setUserId] = useState(null);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');

  const [skills, setSkills] = useState([]);

  const registerUser = async () => {
    const res = await axios.post('http://localhost:3001/api/users', {
      name,
      role,
    });
    setUserId(res.data.id);
  };

  const createSkill = async () => {
    await axios.post('http://localhost:3001/api/skills', {
      title,
      description,
      userId,
      price,
    });
    fetchSkills();
  };

  const fetchSkills = async () => {
    const res = await axios.get('http://localhost:3001/api/skills');
    setSkills(res.data);
  };

  useEffect(() => {
    fetchSkills();
  }, []);

  return (
    <View style={{ padding: 20 }}>
      {!userId ? (
        <>
          <Text>Register</Text>
          <TextInput placeholder="Name" value={name} onChangeText={setName} />
          <TextInput placeholder="Role (learner/teacher)" value={role} onChangeText={setRole} />
          <Button title="Register" onPress={registerUser} />
        </>
      ) : (
        <>
          <Text>Create a Skill</Text>
          <TextInput placeholder="Title" value={title} onChangeText={setTitle} />
          <TextInput placeholder="Description" value={description} onChangeText={setDescription} />
          <TextInput placeholder="Price" value={price} onChangeText={setPrice} keyboardType="numeric" />
          <Button title="Add Skill" onPress={createSkill} />
          <Text style={{ marginTop: 20, fontWeight: 'bold' }}>Available Skills</Text>
          <FlatList
            data={skills}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View style={{ marginVertical: 10 }}>
                <Text>{item.title} - ${item.price}</Text>
                <Text>{item.description}</Text>
              </View>
            )}
          />
        </>
      )}
    </View>
  );
}
