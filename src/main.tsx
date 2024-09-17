import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {ApolloClient, InMemoryCache, ApolloProvider} from '@apollo/client';
import {BrowserRouter} from "react-router-dom";
import NavigationMenu from "@/components/shared/NavigationMenu.tsx";

const client = new ApolloClient({
    uri: 'http://localhost:4000/graphql',
    headers: {
        "Authorisation": `Bearer `
    },
    cache: new InMemoryCache({
        typePolicies: {
            Query: {
                fields: {
                    users: {
                        merge: true
                    }
                }
            }
        }
    }),


});

createRoot(document.getElementById('root')!).render(
    <BrowserRouter>
        <StrictMode>

            <ApolloProvider client={client}>
                <NavigationMenu/>
                <App/>
            </ApolloProvider>
        </StrictMode>,
    </BrowserRouter>
)
