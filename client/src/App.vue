<template>
    <v-app id="inspire">
        <v-container fluid>
            <v-row justify="center">
                <v-col v-for="(component, i) in components"
                       :key="i"
                       cols="12"
                       sm="6"
                       md="4"
                       xl="2"
                       class="d-flex child-flex">
                    <v-card color="blue-grey darken-3">
                        <v-card-text class="text-uppercase lime--text text--lighten-5 py-2">Title</v-card-text>
                        <v-divider class="black"/>
                        <v-row class="ma-0 flex-column" style="height: calc(100% - 37px);">
                            <v-col class="d-flex align-self-center">
                                <component :is="component"/>
                            </v-col>
                        </v-row>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
    </v-app>
</template>

<script>
    import Profile from "@/components/Profile"
    import gql from 'graphql-tag'

    export default {
        components: {
            Profile
        },
        data: () => ({
            components: [
                Profile
            ],
        }),
    }
</script>
