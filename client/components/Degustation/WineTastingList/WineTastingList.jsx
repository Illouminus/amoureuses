import React, {useState, useCallback, useEffect, useMemo} from 'react';
import {WineTastingItem} from '../WineTastingItem/WineTastingItem';
import axios from "axios";
import {EditTasting} from "../EditTasting/EditTasting";
import ModalWindow from "../../ModalWindow";
import {useSession} from "next-auth/react";
import cls from './WineTastingList.module.scss'
import {ButtonProfile} from "../../ButtonProfile/ButtonProfile";
export const WineTastingList = ({ tastings }) => {
    const {status, data} = useSession()
    const login = status === "authenticated"

    const [tastingState, setTastingState] = useState(tastings)
    const [isModalTastingActive, setIsModalTastingActive] = useState(false)
    const [currentTasting, setCurrentTasting] = useState(null);

    const [filterOption, setFilterOption] = useState('upcoming');

    const openModal = useCallback((tasting) => {
        setCurrentTasting(tasting);
        setIsModalTastingActive(true);
    }, []);

    const closeModal = useCallback(() => {
        setIsModalTastingActive(false);
        setCurrentTasting(null); // Reset current tasting
    }, []);

    const toggleFilterOption = () => {
        setFilterOption((prevFilterOption) => (prevFilterOption === "upcoming" ? "past" : "upcoming"));
    };
    const handleTastingUpdate = (updatedTasting) => {
        setTastingState(
            tastingState.map((tasting) =>
                tasting._id === updatedTasting._id ? updatedTasting : tasting
            )
        );
        setIsModalTastingActive(false)
    };

    const handleTastingDelete = (deletedTastingId) => {
        setTastingState(tastingState.filter((tasting) => tasting._id !== deletedTastingId));
    };

    const deleteTasting = async (tastingId) => {
        try {
            await axios.delete("/api/tasting/delete", { data: { id: tastingId } });
            handleTastingDelete(tastingId);
        } catch (error) {
            console.error("Error deleting tasting", error);
        }
    };

    const filteredTastings = useMemo(() => {
        const today = new Date();
        return tastingState.filter((tasting) => {
            const tastingDate = new Date(tasting.date);
            if (filterOption === 'upcoming') {
                return tastingDate >= today;
            } else if (filterOption === 'past') {
                return tastingDate < today;
            }
        });
    }, [tastingState, filterOption]);

    return (
        <>

            <div className={cls.container}>
                <div className={cls.filterOptions}>
                    <ButtonProfile
                        onClick={toggleFilterOption}
                        text={filterOption === "upcoming" ? "Passées" : "A venir"}
                    />
                </div>
                {filteredTastings.map((tasting) => (
                    <div key={tasting._id}>
                        <WineTastingItem  wineTasting={tasting} onTastingDelete={handleTastingDelete} />
                        {
                            login &&
                            <div className={cls.containerButtons}>
                                <ButtonProfile onClick={() => openModal(tasting)} text={'Modifier'}/>
                                <ButtonProfile onClick={() => deleteTasting(tasting._id)} text={'Supprimer'}/>
                            </div>
                        }

                        { isModalTastingActive &&(
                            <ModalWindow onClose={closeModal}>
                                <EditTasting
                                    tasting={currentTasting}
                                    onTastingUpdate={handleTastingUpdate}
                                />
                            </ModalWindow>
                        )}
                    </div>
                ))}
            </div>
        </>

    );
};

