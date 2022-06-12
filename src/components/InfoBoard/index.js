import React, { useCallback, useEffect, useState } from 'react'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'

import * as Styled from './styled'

const DEFAULT_GROUPS = [{
  id: '--first',
  items: [],
}]

const WordList = ({ words }) => {
  const [groups, setGroups] = useState(DEFAULT_GROUPS)

  // Catch and append new words
  useEffect(() => {
    const allWords = groups.map((group) => group.items).flat()

    // Data was likely reset
    if (words.length === 0 && allWords.length > 0) {
      setGroups(DEFAULT_GROUPS)
      return
    }

    const newWords = words.filter((word) => !allWords.includes(word))

    if (newWords.length > 0) {
      setGroups((groups) =>
        groups.map((group, index) =>
          index === groups.length - 1
            ? {
                ...group,
                items: [...group.items, ...newWords],
              }
            : group
        )
      )
    }
  }, [groups, words])

  const onDragEnd = useCallback((result) => {
    const { destination, source, draggableId } = result

    // Invalid destination
    if (!destination) {
      return
    }

    // Dropped into same position
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return
    }

    // Dropped into same Droppable
    if (source.droppableId === destination.droppableId) {
      setGroups((groups) => groups.map((group) => {
        if (group.id !== source.droppableId) {
          return group
        }

        const items = group.items.slice()
        items.splice(source.index, 1)
        items.splice(destination.index, 0, draggableId)

        return {
          ...group,
          items,
        }
      }))
    }
    // Dropped into new droppable
    else {
      setGroups((groups) => groups.map((group) => {
        if (group.id === source.droppableId) {
          const items = group.items.slice()
          items.splice(source.index, 1)
  
          return {
            ...group,
            items,
          }
        } else if (group.id === destination.droppableId) {
          const items = group.items.slice()
          items.splice(destination.index, 0, draggableId)
  
          return {
            ...group,
            items,
          }
        } else {
          return group
        }
      }))
    }

  }, [])

  const removeGroup = useCallback((id) => {
    setGroups((groups) =>
      groups.filter((group) => {
        return group.id !== id || group.items.length > 0
      })
    )
  }, [])

  const addGroup = useCallback(() => {
    const newId = Math.random().toString().slice(2)
    setGroups((groups) =>
      groups.concat({ id: newId, items: [] })
    )
  }, [])

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Styled.Text>
        <Styled.Span>Previous words:</Styled.Span>
        <Styled.Button noSpacing onClick={addGroup}>+ (new group)</Styled.Button>
      </Styled.Text>
      <Styled.ListContainer>
        {groups.map((group) => (
          <Droppable droppableId={group.id} key={group.id}>
            {(provided) => (
              <Styled.List
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                {group.items.length === 0 && (
                  <Styled.Button onClick={() => removeGroup(group.id)}>
                    🗑
                  </Styled.Button>
                )}
                {group.items.map((word, index) => (
                  <Draggable draggableId={word} index={index} key={word}>
                    {(provided) => (
                      <Styled.ListItem
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                      >
                        {word}
                      </Styled.ListItem>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </Styled.List>
            )}
          </Droppable>
        ))}
      </Styled.ListContainer>
    </DragDropContext>
  )
}

const InfoBoard = ({ previousWords, refreshGame, score }) => {
  return (
    <Styled.Board>
      <Styled.Text>
        Score: {score}
      </Styled.Text>
      {previousWords.length > 0 && (
        <React.Fragment>
          <Styled.Text>
            You can use this screen to re-order and create groups for words
            to help you figure out the categories.
          </Styled.Text>
          <WordList words={previousWords} />
        </React.Fragment>
      )}
      <Styled.Text>
        <Styled.Button onClick={refreshGame}>
          Reset game data
        </Styled.Button>
        {' '}
        Warning, this cannot be undone.
      </Styled.Text>
    </Styled.Board>
  )
}

export default InfoBoard
