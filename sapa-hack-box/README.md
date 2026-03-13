# SapaHackBox - Plataforma de Ciberseguretat

![Captura de pantalla 2025-05-07 095806](https://github.com/user-attachments/assets/a00e4f54-84d2-45e0-a589-40b7a1c2ad90)


## Què és SapaHackBox?

SapaHackBox és una plataforma educativa de ciberseguretat on pots aprendre i practicar habilitats de seguretat informàtica en un entorn segur i controlat. Oferim màquines virtuals amb vulnerabilitats específiques perquè puguis posar a prova els teus coneixements, resoldre desafiaments i millorar les teves habilitats en diferents àrees de la ciberseguretat.

## El que pots fer en SapaHackBox

- *Practicar amb màquines vulnerables*: Accedeix a màquines virtuals dissenyades amb vulnerabilitats específiques per a practicar tècniques de hacking ètic.
- *Aprendre segons la teva especialitat*: Comptem amb seccions especialitzades per a Xarxa Team (atac), Blue Team (defensa) i Purple Team (combinat).
- *Guanyar punts i pujar de nivell*: Resol desafiaments per a guanyar punts i avançar en el teu rànquing d'habilitats.
- *Usar la plataforma en el teu idioma*: Disponible en espanyol i anglès, amb més idiomes en camí.
- *Seguir el teu progrés*: Panell personalitzat que mostra el teu avanç i assoliments.
- *Enfrontar desafiaments variats*: Des de problemes de seguretat web fins a forense digital i més.
- *Accedir des de qualsevol dispositiu*: Disseny adaptable per a mòbils, tauletes i ordinadors.

## Com funciona la nostra plataforma

### L'experiència de l'usuari

1. *Registra't i explora*: Crea el teu compte i navega per les diferents màquines disponibles.
2. *Tria el teu desafiament*: Selecciona una màquina segons el teu nivell d'experiència i interessos.
3. *Inicia la màquina*: Amb un sol clic, despleguem una màquina virtual dedicada per a tu.
4. *Connecta't i hackea**: Rep credencials SSH per a connectar-te a la màquina i començar a treballar.
5. *Resol desafiaments*: Troba "flags" ocultes o soluciona problemes de seguretat específics.
6. *Guanya punts*: Cada desafiament superat t'atorga punts que augmenten el teu nivell i desbloquegen contingut avançat.

### Tecnologies que fan possible SapaHackBox

#### Interfície d'Usuari
La nostra interfície moderna i fàcil d'usar està construïda amb:
- **React**: Per a una experiència d'usuari fluida i interactiva
- **Next.js**: Proporciona navegació ràpida i càrrega optimitzada de pàgines
- **Tailwind CSS**: Garanteix un disseny elegant i adaptable a tots els dispositius
- **Framer Motion**: Afegeix animacions suaus que milloren l'experiència d'usuari

#### Sistema Backend
El motor que fa funcionar tot:
- **Next.js API Routes**: Gestiona les peticions de l'aplicació de manera eficient
- **Flask**: microservei en Python que controla el desplegament de màquines virtuals
- **AWS EC2*: Allotja les màquines virtuals vulnerables en el núvol de Amazon
- **Docker**: Aïlla cada màquina virtual per a garantir seguretat i rendiment

#### Base de dades
Emmagatzematge segur i eficient:
- **PostgreSQL en Neon**: Base de dades serverless que escala automàticament segons la demanda
- **Vercel postgres SDK**: Facilita la comunicació segura amb la base de dades

#### Seguretat
Protegim la teva informació i experiència:
- **JWT**: Tokens segurs per a autenticació
- **bcrypt**: Algorisme avançat per a protegir contrasenyes


#### DevOps
Garantim disponibilitat i rendiment:
- **Vercel**: Desplegament continu i hosting d'alta disponibilitat
- *Monitoratge 24/7*: Sistemes automatitzats que supervisen el rendiment
- *Escalat automàtic*: Els recursos s'ajusten segons la demanda d'usuaris

## Arquitectura del Sistema

SapaHackBox combina diverses tecnologies per a oferir una experiència completa:

1. **Frontend**: La interfície que veus i amb la qual interactues
- Construïda amb React i Next.js
- Disseny responsive amb Tailwind CSS
- Animacions fluides amb Framer Motion
- Suport multiidioma integrat

2. **Backend**: El cervell de l'operació
- API REST amb Next.js API Routes
- microservei Flask per a gestió de màquines virtuals
- Sistema d'autenticació i autorització
- Lògica de puntuació i progressió

3. *Infraestructura Cloud**: On ocorre la màgia
- Instàncies AWS EC2 per a allotjar màquines virtuals
- Contenidors Docker per a aïllament i seguretat
- Base de dades PostgreSQL en Neon
- Sistema de monitoratge i alertes

4. *Seguretat**: Protecció en cada capa
- Xifrat de dades en trànsit i en repòs
- Aïllament complet entre usuaris i màquines
- Actualitzacions regulars de seguretat
- Auditories periòdiques del sistema

## Les nostres Màquines Virtuals

SapaHackBox ofereix una varietat de màquines virtuals, cadascuna dissenyada per a ensenyar diferents aspectes de la ciberseguretat:

- *Principiant**: Màquines amb vulnerabilitats bàsiques ideals per a començar
- *Intermedi**: Desafiaments que requereixen combinar diverses tècniques
- *Avançat**: Escenaris complexos similars a situacions del món real
- *Especialitzat**: Màquines enfocades en àrees específiques com a web, xarxes, forense, etc.

Cada màquina inclou:
- Descripció detallada i nivell de dificultat
- Pistes opcionals si et quedes embussat
- Documentació de suport i recursos d'aprenentatge
- Sistema de puntuació basat en la dificultat

## Equips de Ciberseguretat

Oferim contingut especialitzat per als diferents rols en ciberseguretat:

### Xarxa Team (Ofensiu)
Enfocat a trobar i explotar vulnerabilitats:
- Tècniques de reconeixement
- Explotació de vulnerabilitats
- Escalada de privilegis
- Post-explotació

### Blue Team (Defensiu)
Centrat en protegir sistemes i detectar intrusions:
- Anàlisi de logs
- Detecció d'anomalies
- Resposta a incidents
- Enfortiment de sistemes

### Purple Team (Combinat)
Integra habilitats ofensives i defensives:
- Simulació d'amenaces
- Validació de controls de seguretat
- Millora contínua de defenses
- Anàlisis de tècniques d'atac

## Compromís amb l'Educació

SapaHackBox està dissenyat amb un enfocament educatiu:
- Explicacions detallades de les vulnerabilitats
- Recursos addicionals per a aprofundir en cada tema
- Guies pas a pas per a principiants
- Blog amb articles sobre tendències en ciberseguretat
- Comunitat d'usuaris per a compartir coneixements
