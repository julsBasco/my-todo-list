import React, { useState, useEffect, useRef } from "react";
import { Button, Container } from "react-bootstrap";
import { useDB } from "../contexts/StoreContext";
import { useAuth } from "../contexts/AuthContext";
import "../css/Home.css";

const Home = () => {
  const [todoDocument, setTodoDocument] = useState([]);
  const [docUpdate, setDocUpdate] = useState([]);
  const [loading, setLoading] = useState(false);
  const { addDocuments, getDocuments, refreshDocuments } = useDB();
  const { currentUser } = useAuth();
  const todoRef = useRef();

  const addDataToDB = async () => {
    try {
      console.log(docUpdate);
      setDocUpdate(docUpdate.push(todoRef.current.value));
      await addDocuments("users", currentUser.email, {
        todolist: docUpdate,
      });

      await getDocumentData();
    } catch (error) {
      console.error(error);
    }
  };

  const getDocumentData = async () => {
    try {
      setLoading(true);
      const documentData = await getDocuments("users", currentUser.email);
      setDocUpdate(documentData.todolist);
      setTodoDocument(
        documentData.todolist.map((element, idx) => (
          <div className="todoItems" key={idx}>
            {element}
            <Button
              onClick={async (e) => {
                setDocUpdate(docUpdate.splice(idx, 1));
                await refreshDocuments("users", currentUser.email, {
                  todolist: docUpdate,
                });
                await getDocumentData();
              }}
            >
              delete
            </Button>
          </div>
        ))
      );

      setLoading(false);
    } catch {
      console.error("something weird happened");
    }
  };

  const deleteDocument = async () => {};

  useEffect(() => {
    getDocumentData();
    console.log("this is rendered from useEffect");
  }, []);

  return (
    <div>
      <Container>
        <div className="center">
          <input ref={todoRef} type="text" placeholder="to-do what?!" />
          <Button onClick={addDataToDB}>enter todo</Button>
        </div>
        <div className="todoCard">{todoDocument}</div>
      </Container>
    </div>
  );
};

export default Home;
