from flask import Flask, render_template, request, jsonify, send_from_directory
import pickle
import pandas as pd
from sklearn.metrics.pairwise import cosine_similarity
from flask_cors import CORS

data = pd.read_csv('clean_data.csv')
vectorizer = pickle.load(open('vectorizer.pkl', 'rb'))
x = vectorizer.transform(data['Combined'])

def get_recommendation(text, n_rec = 10):
  inp_vec = vectorizer.transform([text])
  similiarity = cosine_similarity(inp_vec, x).flatten()

  best_sim_idx = similiarity.argmax()
  best_data = data.iloc[best_sim_idx]
  best_cluster = best_data['Cluster']

  temp_data = data['Cluster'] == best_cluster
  copy_data = data[temp_data].copy()

  spesified_data = x[temp_data.values]
  spesified_sim = cosine_similarity(inp_vec, spesified_data).flatten()

  copy_data['Similarity'] = spesified_sim
  rec = copy_data.sort_values(by='Similarity', ascending=False).head(n_rec)
  
  if 'course_rating' in rec.columns:
        rec = rec.sort_values(by='course_rating', ascending=False)
         
  return rec

app = Flask(__name__, static_folder="../client/dist", static_url_path="/")
cors = CORS(app, origins="*")

@app.route('/')
def homepage():
    return send_from_directory(app.static_folder, "index.html")

@app.route('/api/users', methods=['GET'])
def users():
    return jsonify(
        {
            "users": [
                'arpan',
                'jake',
                'Teresa'
            ]
        }
    )

@app.route('/api/recommend', methods=['POST'])
def recommend():
    text = request.json['text']
    recoms_df = get_recommendation(text)
    recoms = recoms_df.to_dict(orient="records")
    return jsonify(recoms)

def run_server():
    app.run(host='0.0.0.0', port=5000)