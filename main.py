import os
from flask import Flask, render_template, request

app = Flask(__name__)


@app.route('/')
def home():
    return render_template('home0.html')

@app.route('/1')
def home1():
    return render_template('home.html')


@app.route('/2')
def home2():
    return render_template('home2.html')


@app.route('/3')
def home3():
    return render_template('home3.html')

@app.route('/rocket')
def rocket():
    return render_template('rocket.html')


@app.route('/last')
def last():
    return render_template('Qultimate.html')


@app.route('/story1')
def story():
    return render_template('goal.html')


@app.route('/story2')
def timeline():
    return render_template('timeline.html')


@app.route('/story3')
def technology():
    return render_template('technology.html')


@app.route('/finish')
def finish():
    return render_template('finish.html')


@app.route('/collect')
def collect():
    return render_template('collect.html')


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
    return {
        'result': c >= 2,
        '01': request.form['01'] == 'C',
        '02': request.form['02'] == 'B',
        '03': request.form['03'] == 'B',
        '04': request.form['04'] == 'D',
        'ans': 'Please enter the next challenge~~ (Timeline)\nQ1. C\nQ2. B\nQ3. B\nQ4. D'
    }


@app.route('/checkq2', methods=['POST'])
def checkq2():
    c = 0
    if request.form['01'] == 'A':
        c += 1
    if request.form['02'] == 'A':
        c += 1
    return {
        'result': c >= 1,
        '01': request.form['01'] == 'A',
        '02': request.form['02'] == 'A',
        'ans': 'Please enter the next challenge~~ (Technology)\nQ1. A\nQ2. A'
    }


@app.route('/checkq3', methods=['POST'])
def checkq3():
    c = 0
    if request.form['01'] == 'C':
        c += 1
    if request.form['02'] == 'D':
        c += 1
    return {
        'result': c >= 1,
        '01': request.form['01'] == 'C',
        '02': request.form['02'] == 'D',
        'ans': 'Please enter the next challenge~~ (Ultimate Challenge)\nQ1. C\nQ2. D'
    }


@app.route('/checkq4', methods=['POST'])
def checkq4():
    c = 0
    if request.form['01'] == 'B':
        c += 1
    if request.form['02'] == 'A':
        c += 1
    return {
        'result': c >= 1,
        '01': request.form['01'] == 'B',
        '02': request.form['02'] == 'A',
        'ans': 'Please enter the next challenge~~\nQ1. B\nQ2. A'
    }


app.run(host='0.0.0.0', port=81)
