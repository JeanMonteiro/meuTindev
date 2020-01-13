import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import connection from '../../services/socket'

import './Main.css'

import logo from '../../assets/logo.svg'
import like from '../../assets/like.svg'
import dislike from '../../assets/dislike.svg'
import itsamatch from '../../assets/itsamatch.png'
import api from '../../services/api';

export default function Main({ match }) {
    const [users, setUsers] = useState([])
    const [matchDev, setMatchDev] = useState(false)

    useEffect(() => {
        async function loadUsers() {
            const response = await api.get('/devs', {
                headers: {
                    user: match.params.id
                }
            })
            setUsers(response.data)
        }

        loadUsers()
    }, [match.params.id])

    useEffect(() => {
        connection.connect();

        connection.subscribe(`match:${match.params.id}`, (dev) => {
            setMatchDev(dev)
        });

    }, [match.params.id])

    async function handleLike(id) {
        await api.post('/likes', { id }, {
            headers: {
                user: match.params.id
            }
        })

        setUsers(users.filter(user => user.id !== id))
    }

    async function handleDislike(id) {
        await api.post('/dislikes', { id }, {
            headers: {
                user: match.params.id
            }
        })

        setUsers(users.filter(user => user.id !== id))
    }

    return (
        <div className="main-container">
            <Link to="/">
                <img src={logo} alt="Logo Tindev" />
            </Link>

            {users.length > 0 ? (
                <ul>
                    {users.map(user => (
                        <li key={user.id}>
                            <img src={user.avatar} alt={user.name} />
                            <footer>
                                <strong>{user.name}</strong>
                                <p>{user.bio}</p>
                            </footer>

                            <div className="buttons">
                                <button type="button" onClick={() => handleDislike(user.id)}>
                                    <img src={dislike} alt="Dislike" />
                                </button>

                                <button type="button" onClick={() => handleLike(user.id)}>
                                    <img src={like} alt="Like" />
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                    <div className="empty">Sem devs no momento!</div>
                )}

            {matchDev && (
                <div className="match-container">
                    <img src={itsamatch} alt="" />

                    <img className="avatar" src={matchDev.avatar} alt="" />
                    <strong>{matchDev.name}</strong>
                    <p>{matchDev.bio}</p>

                    <button type="button" onClick={() => setMatchDev(false)}>Fechar</button>
                </div>
            )}
        </div>
    )
}