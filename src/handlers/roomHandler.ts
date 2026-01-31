import { Socket } from "socket.io";
import { v4 as uuidv4 } from "uuid";
import IRoomParams from "../interfaces/iRoomParams";

const roomHandler = (socket: Socket) => {

    // this will hold the roomId as key and array of socket ids as value i.e room and the users in that room 
    const rooms : Record<string, string[]> = {};


    const createRoom = () => {
        // this will be the unique room id which can be shared with others to join
        const roomId = uuidv4();
        // we will make socket connections to join the room
        socket.join(roomId);

        rooms[roomId]= [];
        // we will emit an event from the server side that a socket connection has been added to the room
        socket.emit("room-created", { roomId });
        console.log(`Room created with ID: ${roomId}`);
    };

    const joinedRoom = ({ roomId, peerId }: IRoomParams) => {
        if(rooms[roomId]) {
            console.log(`New user has joined the room: ${roomId} with Peer ID: ${peerId}`);
            rooms[roomId].push(peerId);

            socket.join(roomId);

            socket.emit("get-users" , {
                roomId,
                participants: rooms[roomId]
            })
        }
        
    };

    // we will call the createRoom function when the event is emitted from the client side
    socket.on("createRoom", createRoom);
    socket.on("joined-room", joinedRoom);
};

export default roomHandler;
