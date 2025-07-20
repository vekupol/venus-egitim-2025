import React from 'react';
import styled from 'styled-components';
import { Text , Title} from './studentDrawerKonularim';

function DrawerHareketlerim() {
    return (
        <Container>
            <Title>
                <Text>Hareketlerim</Text>
            </Title>
            <Main>
                <Table>
                    <tr>
                        <th>Tarih</th>
                        <th>Ünite</th>
                        <th>Süre</th>
                    </tr>
                    <tr>
                        <td>09.12.2021</td>
                        <td>Çarpanlara Ayırma</td>
                        <td>1 Saat 16 Dakika 54 Saniye</td>
                    </tr>
                    <tr>
                        <td>09.12.2021</td>
                        <td>Çarpanlara Ayırma</td>
                        <td>1 Saat 16 Dakika 54 Saniye</td>
                    </tr>
                    <tr>
                        <td>09.12.2021</td>
                        <td>arpanlara Ayırmaarpanlara Ayırmaarpanlara Ayırmaarpanlara Ayırmaarpanlara Ayırmaarpanlara Ayırmaarpanlara Ayırmaarpanlara Ayırmaarpanlara Ayırma</td>
                        <td>1 Saat 16 Dakika 54 Saniye</td>
                    </tr>
                    
                </Table>
            </Main>
        </Container>
)
}

const Container = styled.div`
    
`
const Main = styled.div`
    `
const Table = styled.table`
    border-collapse: collapse;
    width: 100%;
    

    td, th {
    border: 1px solid var(--main-color);
    text-align: left;
    padding: 8px;
    }

    tr:nth-child(even) {
    background-color: var(--third-color);
    }
    tr:first-child {
    background-color: var(--second-color);
    }
    td:first-child {
        width: 15%;
    }
    td:last-child {
        width: 30%;
    }
    

`





export default DrawerHareketlerim;




