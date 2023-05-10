import {
    DndContext,
    closestCenter,
  } from "@dnd-kit/core";
  
  import {
    arrayMove,
    SortableContext,
    horizontalListSortingStrategy
  } from "@dnd-kit/sortable";
  
  import {useEffect, useState} from "react";
  import { SortableItem } from './Sortable.Item';
  import { Box, Container } from "@mui/material";
  import { auth, db } from "../../firebase-config";
  import { getDoc, updateDoc, doc } from "firebase/firestore";
  
  export const EditShoutOuts = (props) => {
    const {shoutouts, text_color} = props;
    const [newShoutOuts, setNewShoutOuts] = useState([]);
  
    useEffect(() => {
      Array.isArray(shoutouts) && setNewShoutOuts(shoutouts);
    }, [shoutouts]);
  
    async function handleDragEnd(event){
      const {active, over} = event;
  
      if (active.id !== over.id){
        setNewShoutOuts((items) => {
          const activeIndex = items.indexOf(active.id);
          const overIndex = items.indexOf(over.id);
          const newOrder = arrayMove(items, activeIndex, overIndex);
  
          auth.onAuthStateChanged(async function(user) {
            if (user){
              const ref = doc(db, "users", user.uid);
              await updateDoc(ref, {
                shoutouts: newOrder
              });
  
            };
  
          })
          return newOrder;
        })
      }
  
    };
  
    return (
      <>
        <DndContext
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd} 
        >
          <SortableContext
            items={newShoutOuts}
            strategy={horizontalListSortingStrategy}
          >
            <Container sx={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "row" }}>
              {newShoutOuts.map(shoutout => (
                <Box sx={{ marginRight: "10px" }}>
                  <SortableItem
                    key={shoutout}
                    id={shoutout}
                    shout_out_uid={shoutout}
                    text_color={text_color}
                  />
                </Box>
              ))}
            </Container>
          </SortableContext>
        </DndContext>
      </>
    );
  }