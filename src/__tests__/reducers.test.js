import reducers from "../redux/reducers";

test("reducers", () => {
  let state;

  state = reducers({}, {});
  expect(state).toEqual({ malloc: { Status: false, Size: 0, Top: -1, LastOutput: "", Memory: [] } });

  state = reducers({ malloc: { Status: false, Size: 0, Top: -1, LastOutput: "", Memory: [] } }, { type: "CREATE", payload: { size: 5 } });
  expect(state).toEqual({ malloc: { Status: true, Size: 5, Top: -1, LastOutput: "", Memory: [{ id: 0, data: "" }, { id: 1, data: "" }, { id: 2, data: "" }, { id: 3, data: "" }, { id: 4, data: "" }] } });

  state = reducers({ malloc: { Status: true, Size: 5, Top: -1, LastOutput: "", Memory: [{ id: 0, data: "" }, { id: 1, data: "" }, { id: 2, data: "" }, { id: 3, data: "" }, { id: 4, data: "" }] } }, { type: "PUSH", payload: { data: "test-data" } });
  expect(state).toEqual({ malloc: { Status: true, Size: 5, Top: 0, LastOutput: "", Memory: [{ id: 0, data: "test-data" }, { id: 1, data: "" }, { id: 2, data: "" }, { id: 3, data: "" }, { id: 4, data: "" }] } });

  state = reducers({ malloc: { Status: true, Size: 5, Top: 0, LastOutput: "", Memory: [{ id: 0, data: "test-data" }, { id: 1, data: "" }, { id: 2, data: "" }, { id: 3, data: "" }, { id: 4, data: "" }] } }, { type: "POP" });
  expect(state).toEqual({ malloc: { Status: true, Size: 5, Top: -1, LastOutput: "test-data", Memory: [{ id: 0, data: "" }, { id: 1, data: "" }, { id: 2, data: "" }, { id: 3, data: "" }, { id: 4, data: "" }] } });

  state = reducers({ malloc: { Status: true, Size: 5, Top: -1, LastOutput: "test-data", Memory: [{ id: 0, data: "" }, { id: 1, data: "" }, { id: 2, data: "" }, { id: 3, data: "" }, { id: 4, data: "" }] } }, { type: "REMOVE" });
  expect(state).toEqual({ malloc: { Status: false, Size: 0, Top: -1, LastOutput: "test-data", Memory: [] } });

  state = reducers({}, { type: "PUSH", payload: { data: "test-data" } });
  expect(state).toEqual({ malloc: { Status: false, Size: 0, Top: -1, LastOutput: "", Memory: [] } });

  state = reducers({}, { type: "POP" });
  expect(state).toEqual({ malloc: { Status: false, Size: 0, Top: -1, LastOutput: "", Memory: [] } });

  state = reducers({ malloc: { Status: true, Size: 2, Top: 1, LastOutput: "test-data", Memory: [{ id: 0, data: "test-data1" }, { id: 1, data: "test-data2" }] } }, { type: "PUSH", payload: { data: "test-data3" } });
  expect(state).toEqual({ malloc: { Status: true, Size: 2, Top: 1, LastOutput: "test-data", Memory: [{ id: 0, data: "test-data1" }, { id: 1, data: "test-data2" }] } });

  state = reducers({ malloc: { Status: true, Size: 2, Top: -1, LastOutput: "test-data1", Memory: [{ id: 0, data: "" }, { id: 1, data: "" }] } }, { type: "POP" });
  expect(state).toEqual({ malloc: { Status: true, Size: 2, Top: -1, LastOutput: "test-data1", Memory: [{ id: 0, data: "" }, { id: 1, data: "" }] } });

});
