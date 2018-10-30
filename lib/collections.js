import { Mongo } from 'meteor/mongo';
 
export const Chats = new Mongo.Collection('chats');
export const Messages = new Mongo.Collection('messages');
export const AddMessage = new Mongo.Collection('addMessage');

