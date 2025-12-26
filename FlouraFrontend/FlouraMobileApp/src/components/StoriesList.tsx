import { View, FlatList, StyleSheet, ListRenderItem } from 'react-native';
import React from 'react';
import StoryGridTile from '../components/StoryGridTile';
import { Story } from '../models/Story';

interface StoriesListProps {
    items: Story[];
    onPressStory?: (story: Story) => void;
}

const StoriesList: React.FC<StoriesListProps> = ({items, onPressStory}) => {
    const renderStoryItem: ListRenderItem<Story> = ({item}) => (
        <StoryGridTile story={item} onPress={onPressStory} /> 
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={items}
                keyExtractor={(item) => item.id}
                renderItem={renderStoryItem}
                numColumns={2}
                columnWrapperStyle={styles.row}
                showsVerticalScrollIndicator={false}
            />
        </View>
    );
};

export default StoriesList;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 12,
        //backgroundColor: '#f5f5f5',
    },
    row: {
        justifyContent: 'space-between',
    },
});