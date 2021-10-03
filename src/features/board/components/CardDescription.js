import { Button } from 'antd';
import { useState } from 'react';
import styled from 'styled-components';
import { Detail, SaveButton, StyledTextArea } from '../styles';

export function CardDescription(props) {
    const [state, setState] = useState({
        description: '',
        editMode: false,
    });

    const handleEnableEditMode = () => {
        const { description } = props.card;
        setState({
            description,
            editMode: true,
        });
    };

    const handleDisableEditMode = () => {
        setState((prvsState) => ({
            description: prvsState.description,
            editMode: false,
        }));
    };

    const handleSubmitForm = (event, callback, listKey, cardKey, card) => {
        event.preventDefault();

        callback(listKey, cardKey, { ...card, description: state.description }).then(() => {
            handleDisableEditMode();
        });
    };

    const handleDescriptionChange = (event) => {
        setState((prvsState) => ({
            description: event.target.value,
            editMode: prvsState.editMode,
        }));
    };

    const { editMode } = state;
    const { listKey, card, onEditCard } = props;
    const isValid = state.description;

    return (
        <div>
            {editMode ? (
                <form
                    onSubmit={(event) =>
                        handleSubmitForm(event, onEditCard, listKey, card.key, card)
                    }
                >
                    <StyledTextArea
                        onChange={(event) => handleDescriptionChange(event)}
                        value={state.description}
                        autoSize
                    />
                    <SaveButton
                        disabled={!isValid}
                        onClick={(event) =>
                            handleSubmitForm(event, onEditCard, listKey, card.key, card)
                        }
                    >
                        Save
                    </SaveButton>
                    <Button onClick={handleDisableEditMode}>Cancel</Button>
                </form>
            ) : (
                <DescriptionPlaceholder onClick={handleEnableEditMode}>
                    {card.description ? (
                        <span>{card.description}</span>
                    ) : (
                        <Detail>Add a more detailed description...</Detail>
                    )}
                </DescriptionPlaceholder>
            )}
        </div>
    );
}

const DescriptionPlaceholder = styled.div``;
