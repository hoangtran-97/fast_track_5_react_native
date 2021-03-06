import React, { useContext, useState } from "react";
import { Text, FlatList, View, StyleSheet } from "react-native";
import LottieView from "lottie-react-native";
import { useDispatch } from "react-redux";

import { useProduct } from "../../hooks/useProduct";
import { Search } from "../../Components/Search";
import { ThemeContext } from "../../context";
import { HomeItem } from "../../Components/HomeItem";
import { fetchProducts } from "../../redux/actions";

const emptyCart = () => (
    <View style={styles.container__empty}>
        <Text>Your cart is empty</Text>
        <Text>Pull down to refresh</Text>
        <LottieView
            source={require("../../../assets/empty_box.json")}
            style={styles.lottie}
            autoPlay
            loop
        />
    </View>
);
export const Home = ({ navigation }: { navigation: any }) => {
    const dispatch = useDispatch();
    const [query, setQuery] = useState("");
    const [products] = useProduct(query);
    const { theme } = useContext(ThemeContext);

    return (
        <View
            style={{ ...styles.container, backgroundColor: theme.background }}>
            <Search setQuery={setQuery} query={query} />
            <FlatList
                initialNumToRender={3}
                data={products}
                renderItem={({ item }) => (
                    <HomeItem item={item} navigation={navigation} />
                )}
                keyExtractor={(item) => item._id}
                ListEmptyComponent={emptyCart}
                refreshing={false}
                onRefresh={() => {
                    dispatch(fetchProducts());
                }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    container__empty: {
        marginTop: 20,
        alignItems: "center",
    },
    lottie: { width: 500 },
});
