## Documentação do ChatBot Martins Company

### Link do Notebook com todo o código:
https://colab.research.google.com/drive/1tO6ev_p17MMIvDBTGnRdgmqTGITkO79U?usp=sharing

### Visão Geral

O ChatBot Martins Company é uma aplicação interativa desenvolvida para ajudar usuários com dúvidas frequentes sobre serviços oferecidos pela empresa. Utilizando técnicas de processamento de linguagem natural (NLP) e análise de sentimentos, o ChatBot fornece respostas automáticas baseadas na análise do texto fornecido pelo usuário.

### Requisitos

- **Python 3.7+**
- **NLTK**: Biblioteca de processamento de linguagem natural
- **Transformers**: Biblioteca para modelos de aprendizado profundo
- **Internet**: Para download de recursos do NLTK e utilização do modelo de análise de sentimentos

### Instalação

Certifique-se de ter o Python instalado. Execute os seguintes comandos para instalar as dependências necessárias:

```bash
pip install nltk
pip install transformers
```

### Importações e Inicialização

O código importa as bibliotecas necessárias e baixa os recursos do NLTK:

```python
import nltk
import transformers
from nltk.tokenize import word_tokenize
from nltk.stem import RSLPStemmer
from nltk.corpus import stopwords
from transformers import pipeline

nltk.download('punkt')
nltk.download('stopwords')
nltk.download('rslp')
nltk.download('vader_lexicon')
```

- **NLTK**: Utilizado para tokenização, stemming, remoção de stopwords e análise de sentimentos.
- **Transformers**: Utilizado para análise de sentimentos com um modelo pré-treinado.

### Função `arvore_decisao()`

A função principal do ChatBot, `arvore_decisao()`, é responsável pelo fluxo de interação com o usuário.

#### Estrutura

1. **Inicialização e Dicionário de Palavras-Chave**:
   Define um dicionário `palavras_chave` com respostas pré-definidas para diferentes categorias de dúvidas.

   ```python
   palavras_chave = {
       'login': "...",
       'pag': "...",
       'cadastr': "...",
       'entreg': "...",
       'produt': "..."
   }
   ```

2. **Loop de Interação**:
   O ChatBot continua a interação até que o usuário opte por sair.

   ```python
   while True:
       print("...")
       duvidaUsuario = input("Qual seria sua dúvida hoje? ")

       if "0" in duvidaUsuario:
           print("Obrigado por utilizar o serviço. Até mais!")
           break
   ```

3. **Tokenização e Remoção de Stopwords**:
   Processa a entrada do usuário para remover palavras comuns e desnecessárias.

   ```python
   palavras = word_tokenize(duvidaUsuario)
   stop_words = set(stopwords.words('portuguese'))
   palavras_filtradas = [palavra.lower() for palavra in palavras if palavra.lower() not in stop_words]
   ```

4. **Stemming**:
   Reduz as palavras às suas raízes para melhorar a correspondência com palavras-chave.

   ```python
   stemmer = RSLPStemmer()
   palavras_stemmizadas = [stemmer.stem(palavra) for palavra in palavras_filtradas]
   ```

5. **Verificação de Palavras-Chave**:
   Compara as palavras stemmizadas com as palavras-chave e retorna a resposta apropriada.

   ```python
   encontrou_palavra = False
   for palavra in palavras_stemmizadas:
       if palavra in palavras_chave:
           print(palavras_chave[palavra])
           encontrou_palavra = True
           break
   ```

6. **Análise de Sentimentos**:
   Utiliza um pipeline de análise de sentimentos para entender o feedback do usuário.

   ```python
   sentiment_pipeline = pipeline('sentiment-analysis', model='nlptown/bert-base-multilingual-uncased-sentiment')
   sentimento = sentiment_pipeline(duvidaUsuario)[0]
   ```

   Dependendo do sentimento detectado, o ChatBot fornece uma resposta adequada.

7. **Conclusão**:
   Oferece uma mensagem padrão com um link para mais detalhes.

   ```python
   print("Para mais detalhes, você pode visitar nossa página de perguntas frequentes.")
   ```

### Como Usar

1. Execute o script Python.
2. O ChatBot irá saudar o usuário e solicitar a dúvida.
3. Digite sua dúvida e o ChatBot fornecerá uma resposta com base nas palavras-chave e análise de sentimentos.
4. Para sair, digite "0".

### Observações

- **Stopwords**: Removidas para focar nas palavras mais relevantes.
- **Stemming**: Usado para melhorar a correspondência com palavras-chave.
- **Análise de Sentimentos**: Adiciona um nível de personalização baseado na emoção expressa pelo usuário.

### Temos mais 2 exemplos que serviram para a efetuação e o sucesso desse Chatbot, que estão disponíveis no Colab:
- Árvore de decisão utilizando números e opções estabelecidas pelo funcionário, centralizando em um para o usuário um caminho específico.
- Árvore de decisão utilizando a lematização e cálculo de similaridade com Levenshtein em palavras lematizadas.