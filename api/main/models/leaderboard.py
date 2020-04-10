from neo4j import GraphDatabase
from flask import Flask
from flask_restful import reqparse, abort, Api, Resource
import json
import requests
from .position import update_user_positions
from .user import UserNode
from .alpaca import get_alpaca_account

#this should only be called once a day at night (job)
def update_all_leaderboard_scores():
    print("update leaderboard")
    for user in UserNode.nodes.filter(username__ne='null'):
        print("user: " + str(user.username))
        update_leaderboard_score_for_user(user)

def update_leaderboard_score_for_user(user):
    
    sum_value = 0
    update_user_positions(user)
    account = get_alpaca_account(user.access_token)
    score = float(account['long_market_value']) + float(account['cash']) - 100000 #100000 because its the starting amount
    user.investor_score = score
    user.save()
