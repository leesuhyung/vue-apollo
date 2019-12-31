<template>
    <v-row class="flex-column py-3 align-center justify-center">
        <v-card-text class="text-center">
            <v-avatar class="mb-3 elevation-8 grey" size="88">
                <v-img src="https://randomuser.me/api/portraits/lego/2.jpg"/>
            </v-avatar>
            <h2 class="headline mb-2">{{user.name}}</h2>
            <span class="text--secondary">{{user.team.name}}</span>
        </v-card-text>
        <v-card-actions class="justify-center">
            <v-btn icon text color="pink">
                <v-icon>mdi-heart</v-icon>
            </v-btn>
        </v-card-actions>
    </v-row>
</template>
<script>
    import gql from 'graphql-tag'

    export default {
        data: () => ({
            id: 1
        }),
        apollo: {
            user: {
                query: gql`query user($id: ID!) {
                    user(id: $id) {
                        id
                        name
                        team {
                            id
                            name
                        }
                        createdAt
                        updatedAt
                    }
                }`,
                variables() {
                    return {
                        id: this.id
                    }
                }
            }
        }
    }
</script>
