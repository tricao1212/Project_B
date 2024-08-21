import { View, Text, ActivityIndicator } from 'react-native'
import React from 'react'

const Loading = () => {
  return (
    <View className="flex-1 justify-center">
        <ActivityIndicator size={100} color="green" />
        <Text className="text-center">Loading</Text>
      </View>
  )
}

export default Loading