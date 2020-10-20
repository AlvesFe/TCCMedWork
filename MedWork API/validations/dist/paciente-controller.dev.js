"use strict";

//Importação do JSON Web Token
var jwt = require('jsonwebtoken'); //Importação do Banco de dados MySql


var mysql = require('../mysql').pool; //Importação da biblioteca Bcrypt


var bcrypt = require('bcrypt'); //Faz a validação e inserção no banco de dados de um novo cadastro de pacientes


exports.postPaciente = function (req, res, next) {
  //Função que verifica se determinado valor está em branco ou só com espaços
  function isNullOrWhitespace(field) {
    return !field || !field.trim();
  } //Função que verifica se o email inserido é valido


  function validateEmail(email) {
    if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email)) {
      return false;
    }

    return true;
  } //Laço que verifica se todos os campos possuem valor


  for (var key in req.body) {
    if (isNullOrWhitespace(req.body[key])) {
      return res.status(500).send({
        error: "erro" + key + "vazio"
      });
    }
  } //Verifica o tamanho do campo telefone


  if (req.body.telefone.length < 13) {
    return res.status(500).send({
      error: "errotamanhotelefone"
    });
  } //Verifica o tamanho do campo rg


  if (req.body.rg.length < 12) {
    return res.status(500).send({
      error: "errotamanhorg"
    });
  } //Verifica se o email é valido


  if (validateEmail(req.body.email)) {
    return res.status(500).send({
      error: "erroemailinvalido"
    });
  } //Verifica o tamanho do campo CPF


  if (req.body.cpf.length < 14) {
    return res.status(500).send({
      error: "errotamanhocpf"
    });
  } //Verifica o tamanho do campo celular


  if (req.body.celular.length < 13) {
    return res.status(500).send({
      error: "errotamanhocelular"
    });
  } //Verifica o tamanho do campo senha


  if (req.body.senha.length < 8) {
    return res.status(500).send({
      error: "errotamanhosenha"
    });
  }

  mysql.getConnection(function (error, conn) {
    if (error) {
      return res.status(500).send({
        error: error
      });
    } //Criptografa a senha inserida pelo usuario no momento de cadastro


    bcrypt.hash(req.body.senha, 10, function (errBcrypt, hash) {
      if (errBcrypt) {
        return res.status(500).send({
          error: errBcrypt
        });
      }

      var id_Paciente = bcrypt.hashSync(Date.now().toString(), 10);
      conn.query('INSERT INTO tbl_Paciente (id_Paciente ,dt_nascimento, nome, telefone, tp_sanguineo, alergia, rg, email, cpf, endereco, celular, senha, fk_id_Recepcionista)VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?)', [id_Paciente, req.body.dt_Nascimento, req.body.nome, req.body.telefone, req.body.tp_sanguineo, req.body.alergia, req.body.rg, req.body.email, req.body.cpf, req.body.endereco, req.body.celular, hash, req.body.fk_id_Recepcionista], function (error, resultado, fields) {
        conn.release();

        if (error) {
          return res.status(500).send({
            error: error
          });
        }

        res.status(201).send({
          mensagem: 'Paciente Cadastrado',
          id_Paciente: resultado.insertId
        });
      });
    });
  });
}; //Faz verificação no banco de dados de todos os pacientes cadastrados


exports.getPacientes = function (req, res, next) {
  mysql.getConnection(function (error, conn) {
    if (error) {
      return res.status(500).send({
        error: error
      });
    }

    conn.query('SELECT * FROM tbl_Paciente', function (error, resultado, fields) {
      conn.release();

      if (error) {
        return res.status(500).send({
          error: error
        });
      }

      res.status(200).send({
        data: resultado
      });
    });
  });
}; //Faz verificação no banco de dados de um paciente cadastrado, usando seu CPF


exports.getPaciente = function (req, res, next) {
  //Verifica o tamanho do campo CPF
  if (req.params.cpf_Paciente.length < 14) {
    return res.status(500).send({
      error: "errotamanhocpf"
    });
  }

  mysql.getConnection(function (error, conn) {
    if (error) {
      return res.status(500).send({
        error: error
      });
    }

    conn.query('SELECT * FROM tbl_Paciente WHERE cpf = ?', [req.params.cpf_Paciente], function (error, resultado, fields) {
      conn.release();

      if (error) {
        return res.status(500).send({
          error: error
        });
      }

      res.status(200).send({
        data: resultado
      });
    });
  });
}; //Atualiza os dados de um determinado paciente


exports.patchPaciente = function (req, res, next) {
  //Laço que verifica se todos os campos possuem valor
  for (var key in req.body) {
    if (!req.body[key]) {
      return res.status(500).send({
        error: "erro" + key + "vazio"
      });
    }
  } //Verifica o tamanho do campo telefone


  if (req.body.telefone.length < 13) {
    return res.status(500).send({
      error: "errotamanhotelefone"
    });
  } //Verifica o tamanho do campo CPF


  if (req.body.cpf.length < 14) {
    return res.status(500).send({
      error: "errotamanhocpf"
    });
  } //Verifica o tamanho do campo celular


  if (req.body.celular.length < 13) {
    return res.status(500).send({
      error: "errotamanhocelular"
    });
  } //Verifica o tamanho do campo senha


  if (req.body.senha.length < 8) {
    return res.status(500).send({
      error: "errotamanhosenha"
    });
  }

  mysql.getConnection(function (error, conn) {
    if (error) {
      return res.status(500).send({
        error: error
      });
    }

    bcrypt.hash(req.body.senha, 10, function (errBcrypt, hash) {
      if (errBcrypt) {
        return res.status(500).send({
          error: errBcrypt
        });
      }

      conn.query("UPDATE tbl_Paciente\n                    SET\n                    dt_Nascimento = ?,\n                    nome = ?,\n                    telefone = ?,\n                    tp_sanguineo= ?,\n                    alergia = ?,\n                    endereco = ?,\n                    celular = ?,\n                    ativo = ?,\n                    senha = ?,\n                    alt_senha = ?,\n                    foto = ?\n                    WHERE cpf = ?", [req.body.dt_Nascimento, req.body.nome, req.body.telefone, req.body.tp_sanguineo, req.body.alergia, req.body.endereco, req.body.celular, req.body.ativo, hash, req.body.alt_senha, req.body.foto, req.body.cpf], function (error, resultado, fields) {
        conn.release();

        if (error) {
          return res.status(500).send({
            error: error
          });
        }

        res.status(202).send({
          mensagem: 'Paciente Atualizado',
          response: resultado.insertId
        });
      });
    });
  });
};

exports.deletePaciente = function (req, res, next) {
  //Função que verifica se determinado valor está em branco ou só com espaços
  function isNullOrWhitespace(field) {
    return !field || !field.trim();
  }

  if (isNullOrWhitespace(req.body.cpf)) {
    return res.status(500).send({
      error: "errocpfvazio"
    });
  } //Verifica o tamanho do campo CPF


  if (req.body.cpf.length < 14) {
    return res.status(500).send({
      error: "errotamanhocpf"
    });
  }

  mysql.getConnection(function (error, conn) {
    if (error) {
      return res.status(500).send({
        error: error
      });
    }

    conn.query("DELETE FROM tbl_Paciente WHERE cpf = ?", [req.body.cpf], function (error, resultado, fields) {
      conn.release();

      if (error) {
        return res.status(500).send({
          error: error
        });
      }

      res.status(202).send({
        mensagem: 'Paciente excluído com sucesso'
      });
    });
  });
};

exports.logarPaciente = function (req, res, next) {
  //Função que verifica se determinado valor está em branco ou só com espaços
  function isNullOrWhitespace(field) {
    return !field || !field.trim();
  } //Função que verifica se o email inserido é valido


  function validateEmail(email) {
    if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email)) {
      return false;
    }

    return true;
  } //Laço que verifica se todos os campos possuem valor


  for (var key in req.body) {
    if (isNullOrWhitespace(req.body[key])) {
      return res.status(500).send({
        error: "erro" + key + "vazio"
      });
    }
  } //Verifica se o email é valido


  if (validateEmail(req.body.email)) {
    return res.status(500).send({
      error: "erroemailinvalido"
    });
  }

  mysql.getConnection(function (error, conn) {
    if (error) {
      return res.status(500).send({
        error: error
      });
    }

    var query = "SELECT * FROM tbl_Paciente WHERE email = ?";
    conn.query(query, [req.body.email], function (error, results, fields) {
      conn.release();

      if (error) {
        return res.status(500).send({
          error: error
        });
      }

      if (results.length < 1) {
        return res.status(401).send({
          mensagem: 'Falha na autenticação'
        });
      }

      bcrypt.compare(req.body.senha, results[0].senha, function (err, result) {
        if (err) {
          return res.status(401).send({
            mensagem: 'Falha na autenticação'
          });
        }

        if (result) {
          var token = jwt.sign({
            id_Paciente: results[0].id_Paciente,
            email: results[0].email,
            nome: results[0].nome
          }, process.env.JWT_KEY, {
            expiresIn: "5h"
          });
          return res.status(200).send({
            mensagem: 'Autenticado com sucesso',
            token: token
          });
        }

        return res.status(401).send({
          mensagem: 'Falha na autenticação'
        });
      });
    });
  });
};