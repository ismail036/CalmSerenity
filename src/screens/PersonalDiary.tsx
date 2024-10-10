import React, { useState, useEffect, useContext } from 'react';
import {
    View,
    Text,
    TextInput,
    Button,
    ScrollView,
    StyleSheet,
    Alert,
    TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BackgroundColorContext } from '../context/BackgroundColorContext.tsx';

interface Note {
    id: string;
    title: string;
    content: string;
}

const PersonalDiary: React.FC = () => {
    const { backgroundColor } = useContext(BackgroundColorContext);
    const [notes, setNotes] = useState<Note[]>([]);
    const [noteTitle, setNoteTitle] = useState('');
    const [noteContent, setNoteContent] = useState('');

    const loadNotes = async () => {
        try {
            const savedNotes = await AsyncStorage.getItem('notes');
            if (savedNotes !== null) {
                setNotes(JSON.parse(savedNotes));
            }
        } catch (error) {
            console.log('Error loading notes:', error);
        }
    };

    const saveNotes = async (newNotes: Note[]) => {
        try {
            await AsyncStorage.setItem('notes', JSON.stringify(newNotes));
        } catch (error) {
            console.log('Error saving notes:', error);
        }
    };

    const addNote = () => {
        if (noteTitle.trim() === '' || noteContent.trim() === '') {
            Alert.alert('Error', 'Both title and content are required!');
            return;
        }

        const newNote: Note = {
            id: Math.random().toString(), // Unique ID
            title: noteTitle,
            content: noteContent,
        };

        const updatedNotes = [...notes, newNote];
        setNotes(updatedNotes);
        saveNotes(updatedNotes);
        setNoteTitle('');
        setNoteContent('');
    };

    const deleteNote = (id: string) => {
        const updatedNotes = notes.filter((note) => note.id !== id);
        setNotes(updatedNotes);
        saveNotes(updatedNotes);
    };

    useEffect(() => {
        loadNotes();
    }, []);

    return (
        <View style={[styles.container, { backgroundColor }]}>
            <Text style={styles.header}>Personal Diary</Text>

            <TextInput
                style={styles.input}
                placeholder="Enter the title of your note..."
                value={noteTitle}
                onChangeText={setNoteTitle}
                placeholderTextColor="#888"
            />
            <TextInput
                style={styles.textArea}
                placeholder="Write your note here..."
                value={noteContent}
                onChangeText={setNoteContent}
                multiline
                placeholderTextColor="#888"
            />

            <TouchableOpacity style={styles.addButton} onPress={addNote}>
                <Text style={styles.addButtonText}>Add Note</Text>
            </TouchableOpacity>

            <ScrollView>
                {notes.map((note) => (
                    <View key={note.id} style={styles.noteCard}>
                        <Text style={styles.noteTitle}>{note.title}</Text>
                        <Text style={styles.noteContent}>{note.content}</Text>
                        <TouchableOpacity onPress={() => deleteNote(note.id)} style={styles.deleteButton}>
                            <Text style={styles.deleteButtonText}>Delete</Text>
                        </TouchableOpacity>
                    </View>
                ))}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    header: {
        fontSize: 30,
        color: '#fff',
        marginBottom: 20,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    input: {
        backgroundColor: '#3a3a3a',
        padding: 15,
        marginBottom: 10,
        borderRadius: 10,
        color: '#fff',
        fontSize: 16,
    },
    textArea: {
        backgroundColor: '#3a3a3a',
        padding: 15,
        height: 120,
        borderRadius: 10,
        marginBottom: 10,
        color: '#fff',
        fontSize: 16,
    },
    addButton: {
        backgroundColor: '#1E90FF',
        paddingVertical: 15,
        borderRadius: 10,
        marginBottom: 20,
        alignItems: 'center',
    },
    addButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    noteCard: {
        backgroundColor: '#4a7c59',
        padding: 20,
        borderRadius: 10,
        marginBottom: 10,
    },
    noteTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 10,
    },
    noteContent: {
        fontSize: 16,
        color: '#ddd',
    },
    deleteButton: {
        backgroundColor: '#ff6347',
        padding: 10,
        borderRadius: 5,
        marginTop: 10,
        alignItems: 'center',
    },
    deleteButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
});

export default PersonalDiary;
