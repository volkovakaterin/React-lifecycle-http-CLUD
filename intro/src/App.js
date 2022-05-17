import React, { useState, useEffect } from 'react';
import './App.css';
import { nanoid } from 'nanoid'

function App() {
  const [form, setForm] = useState("")
  const [stateNotes, setNotes] = useState();
  let notes;
  function loadingNotes() {
    fetch("http://localhost:8080/notes")
      .then(res => res.json())
      .then(
        (result) => {
          setNotes(result);
          console.log(result)
        },
        (error) => {
          setNotes(error);
        }
      )
  }

  const update = e => {
    console.log("update");
    loadingNotes();
  }

  const deleteNote = (id, e) => {
    console.log("delete");
    console.log(id, e);
    fetch("http://localhost:8080/notes", {
method: 'DELETE',
headers: {'Content-type': 'application/x-www-form-urlencoded'},
body: JSON.stringify(id)
    }).then(response=> response.json()).then(response=> console.log(response)).then(loadingNotes())
  }

  const handleNoteChange = (evt) => {
    setForm(evt.target.value)
  }

  const sendNote = e => {
    e.preventDefault();
    console.log("send");
    const obj = { id: nanoid(), content: form }
    let xhr = new XMLHttpRequest();
    xhr.open('POST', 'http://localhost:8080/notes');
    xhr.addEventListener('readystatechange', function () {
      //Проверим состояние запроса, нас интересует случай когда он завершен ( DONE )
      if (xhr.readyState === 4) {
        //Дальше проверим какой код ответа нам выдал сервер
        if (xhr.status === 200) {
          //Если попали сюда, значит можно выполнить функцию, которую вам нужно
          console.log("200");

        }
      }
    }, false);
    const jsonstring = JSON.stringify(obj);
    console.log(jsonstring)
    xhr.send(jsonstring);
    setForm("");
    loadingNotes();
  }

  useEffect(() => {
    console.log("first")
    loadingNotes();
    return function cleanup() {
      loadingNotes()
    };
  }, []);
  if (typeof stateNotes === 'object') {
    notes = stateNotes.map((note) =>
      <div key={note.id} className='note'>
        <div className='delete' onClick={(e) => deleteNote(note.id, e)}><svg width="20px" height="20px" enableBackground="new 0 0 415.188 415.188" version="1.1" viewBox="0 0 415.19 415.19" xmlSpace="preserve" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
          <path d="m412.86 78.976c3.404-6.636 2.831-14.159-0.15-20.404 0.84-7.106-1.02-14.321-7.746-19.855-6.262-5.151-12.523-10.305-18.781-15.457-11.005-9.055-28.237-11.913-38.941 0-48.619 54.103-99.461 105.86-152.17 155.72-39.185-36.605-78.846-72.713-118.22-108.87-13.82-12.693-33.824-8.71-42.519 6.411-12.665 6.286-22.931 14.481-31.42 28.468-4.042 6.664-3.727 15.076 0 21.764 25.421 45.578 74.557 85.651 114.96 122.53-5.406 4.839-10.772 9.724-16.287 14.461-54.43 46.742-91.144 76.399-23.029 124.32 0.919 0.647 1.856 0.504 2.789 0.882 1.305 0.602 2.557 1.026 4.004 1.264 0.45 0.017 0.87 0.093 1.313 0.058 1.402 0.114 2.774 0.471 4.195 0.192 36.621-7.18 70.677-35.878 101.58-67.48 30.1 29.669 62.151 58.013 97.395 74.831 8.391 4.005 18.395 1.671 24.855-3.931 10.832 0.818 20.708-5.913 25.665-15.586 0.734-0.454 1.207-0.713 2.002-1.21 15.748-9.838 17.187-29.431 5.534-42.936-26.313-30.492-54.284-59.478-82.798-87.95 51.341-50.166 115.45-104.27 147.78-167.23z" />
        </svg></div>
        <div className='content'>{note.content}</div>
      </div>);
  }
  return (
    <>
      <div className='title'>
        <h1 className='name-title'>Notes</h1>
        <div className='update' onClick={(e) => update(e)}><svg width="30px" height="30px" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M1.90321 7.29677C1.90321 10.341 4.11041 12.4147 6.58893 12.8439C6.87255 12.893 7.06266 13.1627 7.01355 13.4464C6.96444 13.73 6.69471 13.9201 6.41109 13.871C3.49942 13.3668 0.86084 10.9127 0.86084 7.29677C0.860839 5.76009 1.55996 4.55245 2.37639 3.63377C2.96124 2.97568 3.63034 2.44135 4.16846 2.03202L2.53205 2.03202C2.25591 2.03202 2.03205 1.80816 2.03205 1.53202C2.03205 1.25588 2.25591 1.03202 2.53205 1.03202L5.53205 1.03202C5.80819 1.03202 6.03205 1.25588 6.03205 1.53202L6.03205 4.53202C6.03205 4.80816 5.80819 5.03202 5.53205 5.03202C5.25591 5.03202 5.03205 4.80816 5.03205 4.53202L5.03205 2.68645L5.03054 2.68759L5.03045 2.68766L5.03044 2.68767L5.03043 2.68767C4.45896 3.11868 3.76059 3.64538 3.15554 4.3262C2.44102 5.13021 1.90321 6.10154 1.90321 7.29677ZM13.0109 7.70321C13.0109 4.69115 10.8505 2.6296 8.40384 2.17029C8.12093 2.11718 7.93465 1.84479 7.98776 1.56188C8.04087 1.27898 8.31326 1.0927 8.59616 1.14581C11.4704 1.68541 14.0532 4.12605 14.0532 7.70321C14.0532 9.23988 13.3541 10.4475 12.5377 11.3662C11.9528 12.0243 11.2837 12.5586 10.7456 12.968L12.3821 12.968C12.6582 12.968 12.8821 13.1918 12.8821 13.468C12.8821 13.7441 12.6582 13.968 12.3821 13.968L9.38205 13.968C9.10591 13.968 8.88205 13.7441 8.88205 13.468L8.88205 10.468C8.88205 10.1918 9.10591 9.96796 9.38205 9.96796C9.65819 9.96796 9.88205 10.1918 9.88205 10.468L9.88205 12.3135L9.88362 12.3123C10.4551 11.8813 11.1535 11.3546 11.7585 10.6738C12.4731 9.86976 13.0109 8.89844 13.0109 7.70321Z"
            fill="currentColor"
          />
        </svg></div>
      </div>
      {notes}
      <div className='new-note'>
        <h1 className='title-new-note'>New note</h1>
        <form className='form'>
          <input className='input' id="name" name="name" value={form} onChange={handleNoteChange} />
          <button className='send' onClick={(e) => sendNote(e)}>
            <svg version="1.1" id="Layer_1" width="20px" height="20px" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
              viewBox="0 0 512.001 512.001" enableBackground="new 0 0 512.001 512.001;" xmlSpace="preserve">
              <g><g><path d="M483.927,212.664L66.967,25.834C30.95,9.695-7.905,42.023,1.398,80.368l21.593,89.001
			c3.063,12.622,11.283,23.562,22.554,30.014l83.685,47.915c6.723,3.85,6.738,13.546,0,17.405l-83.684,47.915
			c-11.271,6.452-19.491,17.393-22.554,30.015l-21.594,89c-9.283,38.257,29.506,70.691,65.569,54.534l416.961-186.83
			C521.383,282.554,521.333,229.424,483.927,212.664z M359.268,273.093l-147.519,66.1c-9.44,4.228-20.521,0.009-24.752-9.435
			c-4.231-9.44-0.006-20.523,9.434-24.752l109.37-49.006l-109.37-49.006c-9.44-4.231-13.665-15.313-9.434-24.752
			c4.229-9.44,15.309-13.666,24.752-9.435l147.519,66.101C373.996,245.505,374.007,266.49,359.268,273.093z"/>
              </g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g>
            </svg>
          </button>
        </form>
      </div>
    </>
  );
}

export default App;
