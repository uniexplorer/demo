import os
from flask import Flask, render_template, request

app = Flask(__name__)


@app.route('/')
def home():
    return render_template('home.html')


@app.route('/2')
def home2():
    return render_template('home2.html')


@app.route('/3')
def home3():
    return render_template('home3.html')


@app.route('/story1')
def story():
    return render_template('goal.html')


@app.route('/story2')
def timeline():
    return render_template('timeline.html')


@app.route('/story3')
def technology():
    return render_template('technology.html')


@app.route('/test')
def test():
    return render_template('test.html')


@app.route('/quiz01')
def quiz01():
    return render_template('Qgoal.html')


@app.route('/quiz02')
def quiz02():
    return render_template('Qtimeline.html')


@app.route('/quiz03')
def quiz03():
    return render_template('Qtechnology.html')


@app.route('/checkq1', methods=['POST'])
def checkq1():
    c = 0
    if request.form['01'] == 'C':
        c += 1
    if request.form['02'] == 'B':
        c += 1
    if request.form['03'] == 'B':
        c += 1
    if request.form['04'] == 'D':
        c += 1
    if c >= 2:
        return {'result': True}
    return {'result': False}

@app.route('/checkq2', methods=['POST'])
def checkq2():
    c = 0
    if request.form['01'] == 'A':
        c += 1
    if request.form['02'] == 'A':
        c += 1
    if c >= 1:
        return {'result': True}
    return {'result': False}

@app.route('/checkq3', methods=['POST'])
def checkq3():
    c = 0
    if request.form['01'] == 'C':
        c += 1
    if request.form['02'] == 'D':
        c += 1
    if c >= 1:
        return {'result': True}
    return {'result': False}



app.run(host='0.0.0.0', port=81)
