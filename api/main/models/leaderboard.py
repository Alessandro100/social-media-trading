from neo4j import GraphDatabase
from flask import Flask
from flask_restful import reqparse, abort, Api, Resource
import json
import requests
from .position import update_user_positions
from .user import UserNode

#this should only be called once a day at night (job)
def update_all_leaderboard_scores():
    for user in UserNode.nodes.all():
        update_leaderboard_score_for_user(user)

def update_leaderboard_score_for_user(user):
    sum_value = 0
    update_user_positions(user)
    for position in user.positions:
        sum_value += int(position.quantity) * float(position.avergae_purchase_price)
    score = sum_value + float(user.free_cash) - 100000 #100000 because its the starting amount
    user.investor_score = score
    user.save()
