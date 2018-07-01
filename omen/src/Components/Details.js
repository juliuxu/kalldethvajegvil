import React from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  Text,
  TouchableOpacity
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import gql from "graphql-tag";
import { graphql } from "react-apollo";

const UPVOTE_MUTATION = gql`
  mutation($omenId: Int!) {
    upVote(input: { userUuid: "ok123", omenId: $omenId }) {
      omen {
        id
        upvotes
        downvotes
        message
      }
      errors
    }
  }
`;

const DOWNVOTE_MUTATION = gql`
  mutation($omenId: Int!) {
    downVote(input: { userUuid: "ok123", omenId: $omenId }) {
      omen {
        id
        upvotes
        downvotes
        message
      }
      errors
    }
  }
`;

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get("window").width,
    padding: 10,
    backgroundColor: "#FFFFFF",
    borderTopRightRadius: 5,
    borderTopLeftRadius: 5,
    borderTopColor: "#CCCCCC",
    borderTopWidth: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: 100
  },

  contentContainer: {
    flex: 0.8
  },

  iconContainer: {
    flex: 0.1
  },

  actionContainer: {
    flex: 0.1,
    alignItems: "center"
  }
});

class DetailsView extends React.PureComponent {
  optimisticVote(value) {}

  updateQueries = (previousData, { mutationResult }) => {
    console.log({ previousData, mutationResult });
    const result = mutationResult.data.upVote || mutationResult.data.downVote;

    previousData.omen.edges = previousData.omen.edges.map(omen => {
      console.log({ omen, result });
      if (omen.node.id === result.omen.id) {
        console.log("FOUND MATCH");
        console.log({
          original: omen,
          replacement: {
            ...omen,
            node: { ...omen.node, ...result.omen }
          }
        });
        return {
          ...omen,
          node: { ...omen.node, ...result.omen }
        };
      }
      return node;
    });
    console.log({ previousData });
    return previousData;
  };

  render() {
    const { omen = {}, upvote, downvote } = this.props;

    return (
      <View style={styles.container}>
        <View style={styles.iconContainer} />

        <View style={styles.contentContainer}>
          <Text>{omen && omen.message}</Text>
        </View>

        <View style={styles.actionContainer}>
          <TouchableOpacity
            onPress={() =>
              upvote({ updateQueries: { GetOmens: this.updateQueries } })
            }
          >
            <Icon name="keyboard-arrow-up" size={25} />
          </TouchableOpacity>
          <Text style={{ textAlign: "center" }}>
            {(omen.upvotes || 0) - (omen.downvotes || 0)}
          </Text>
          <TouchableOpacity
            onPress={() =>
              downvote({ updateQueries: { GetOmens: this.updateQueries } })
            }
          >
            <Icon name="keyboard-arrow-down" size={25} />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const upvote = graphql(UPVOTE_MUTATION, {
  name: "upvote",
  options: ({ omen }) => ({
    variables: { omenId: omen && parseInt(omen.id, 10) }
  })
});

const downvote = graphql(DOWNVOTE_MUTATION, {
  name: "downvote",
  options: ({ omen }) => ({
    variables: { omenId: omen && parseInt(omen.id, 10) }
  })
});

export default upvote(downvote(DetailsView));
