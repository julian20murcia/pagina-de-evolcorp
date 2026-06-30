import React, { useEffect, useMemo, useRef, useState } from 'react';
import { FaWhatsapp } from 'react-icons/fa';
import { createRoot } from 'react-dom/client';
import * as THREE from 'three';
import {
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  Clock3,
  FileText,
  Fingerprint,
  LayoutDashboard,
  Menu,
  MonitorSmartphone,
  BrainCircuit,
  Puzzle,
  Route,
  ShieldCheck,
  Smartphone,
  TrendingUp,
  Users,
  Workflow,
  X,
  Zap,
} from 'lucide-react';
import './styles.css';

const publicAsset = path => `${import.meta.env.BASE_URL}${path}`;

const logoBlue = publicAsset('Version Azul.png');
const logoDark = publicAsset('Version azul oscuro.png');
const logoWhite = publicAsset('Version Blanca.png');

const person1 = publicAsset('PERSONAJE 1.png');
const person2 = publicAsset('PERSONAJE 2.png');
const person3 = publicAsset('PERSONAJE 3.png');
const person4 = publicAsset('PERSONAJE 4.png');
const modulo2 = publicAsset('MODULO 2.png');

const deyvidPhoto = publicAsset('equipo/Deyvid.png');
const julianPhoto = publicAsset('equipo/Julian.png');
const bradleyPhoto = publicAsset('equipo/Brad.png');

const agrolecheLogo = publicAsset('clientes/Agroleche.png');
const cdaLogo = publicAsset('clientes/CDA.png');
const dipallLogo = publicAsset('clientes/Dipall.png');
const sanAndresLogo = publicAsset('clientes/logoandres.png');
const manantialLogo = publicAsset('clientes/logomanetial.png');
const laVillaLogo = publicAsset('clientes/logovilla.png');
const minaLogo = publicAsset('clientes/MInaustralia.webp');
const nogalLogo = publicAsset('clientes/nogal.png');
const parqueLogo = publicAsset('clientes/Parque.png');
const vancouverLogo = publicAsset('clientes/vancouver.png');

const superCashLogo = publicAsset('clientes/SuperCash.png');
const gestionarLogo = publicAsset('clientes/Gestionar.png');
const leonLogo = publicAsset('clientes/Leon.png');
const gimnasioLogo = publicAsset('clientes/Gimnasio.png');
const hedmontLogo = publicAsset('clientes/hedmont.png');
const WA_MESSAGE = `Hola, equipo EvolCorp
Estuve viendo su página y me llamó la atención cómo transforman procesos en herramientas digitales útiles.
Tengo un reto en mi negocio que quiero organizar, automatizar o mejorar. Me gustaría contarles un poco y saber qué solución podrían proponerme.`;

const WA = `https://wa.me/573232220691?text=${encodeURIComponent(WA_MESSAGE)}`;

function useReveal() {
  useEffect(() => {
    const targets = [...document.querySelectorAll('[data-reveal]')];

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.14, rootMargin: '0px 0px -6% 0px' },
    );

    targets.forEach((target, index) => {
      target.style.setProperty('--delay', `${Math.min(index % 6, 5) * 70}ms`);
      observer.observe(target);
    });

    return () => observer.disconnect();
  }, []);
}

function RubikCubeScene() {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return undefined;

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      34,
      Math.max(mount.clientWidth, 1) / Math.max(mount.clientHeight, 1),
      0.1,
      100,
    );

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });

    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.35));
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.12;

    mount.appendChild(renderer.domElement);

    const rig = new THREE.Group();
    rig.rotation.set(-0.08, -0.18, 0.02);
    scene.add(rig);

    const cubeRoot = new THREE.Group();
    cubeRoot.position.set(0.28, 0.03, 0);
    rig.add(cubeRoot);

    const cubeSize = 0.84;
    const spacing = 0.92;

    const geometry = new THREE.BoxGeometry(
      cubeSize,
      cubeSize,
      cubeSize,
      2,
      2,
      2,
    );

    const edgeGeometry = new THREE.EdgesGeometry(geometry, 18);

    const palette = [
      '#05072f',
      '#083f8c',
      '#0069d9',
      '#0099e8',
      '#00baff',
      '#00d8df',
      '#00ffc4',
      '#3eeac4',
      '#8cf5ed',
      '#dffcff',
    ];

    const cubies = [];

    const randomVector = () =>
      new THREE.Vector3(
        Math.random() - 0.5,
        Math.random() - 0.5,
        Math.random() - 0.5,
      ).normalize();

    let index = 0;

    [-1, 0, 1].forEach(y => {
      [-1, 0, 1].forEach(x => {
        [-1, 0, 1].forEach(z => {
          const target = new THREE.Vector3(
            x * spacing,
            y * spacing,
            z * spacing,
          );

          const direction = target.clone();

          if (direction.lengthSq() < 0.01) {
            direction.set(0.2, 0.32, 1);
          }

          direction.normalize();

          const start = target
            .clone()
            .add(direction.multiplyScalar(0.58 + Math.random() * 0.42))
            .add(randomVector().multiplyScalar(0.16 + Math.random() * 0.14));

          const color =
            palette[(index * 5 + x - y + z + 17) % palette.length];

          const material = new THREE.MeshStandardMaterial({
            color,
            roughness: 0.25,
            metalness: 0.18,
            emissive: new THREE.Color(color).multiplyScalar(0.08),
            emissiveIntensity: 0.48,
          });

          const cubie = new THREE.Mesh(geometry, material);

          cubie.position.copy(start);

          cubie.rotation.set(
            (Math.random() - 0.5) * Math.PI * 1.1,
            (Math.random() - 0.5) * Math.PI * 1.1,
            (Math.random() - 0.5) * Math.PI * 1.1,
          );

          const edges = new THREE.LineSegments(
            edgeGeometry,
            new THREE.LineBasicMaterial({
              color: '#ffffff',
              transparent: true,
              opacity: 0.22,
            }),
          );

          cubie.add(edges);
          cubeRoot.add(cubie);

          cubies.push({
            cubie,
            target,
            start,
            rotation: cubie.rotation.clone(),
            delay: 0.03 + Math.random() * 0.44,
          });

          index += 1;
        });
      });
    });

    const textureLoader = new THREE.TextureLoader();
    const logoTexture = textureLoader.load(logoWhite);

    logoTexture.colorSpace = THREE.SRGBColorSpace;
    logoTexture.minFilter = THREE.LinearFilter;

    const logoMaterial = new THREE.MeshBasicMaterial({
      map: logoTexture,
      transparent: true,
      opacity: 0,
      depthWrite: false,
    });

    const logoPlane = new THREE.Mesh(
      new THREE.PlaneGeometry(2.66, 1.3),
      logoMaterial,
    );

    logoPlane.position.set(0, -0.02, 1.42);
    cubeRoot.add(logoPlane);

    const logoGlow = new THREE.Mesh(
      new THREE.PlaneGeometry(3.1, 1.6),
      new THREE.MeshBasicMaterial({
        color: '#00d8df',
        transparent: true,
        opacity: 0.025,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      }),
    );

    logoGlow.position.set(0, -0.02, 1.4);
    cubeRoot.add(logoGlow);

    const floor = new THREE.Group();
    floor.position.y = -1.72;
    floor.rotation.x = Math.PI / 2;
    scene.add(floor);

    [2.02, 2.64].forEach((radius, ringIndex) => {
      const ring = new THREE.Mesh(
        new THREE.TorusGeometry(
          radius,
          0.012 + ringIndex * 0.004,
          8,
          150,
        ),
        new THREE.MeshBasicMaterial({
          color: ringIndex === 0 ? '#00baff' : '#00ffc4',
          transparent: true,
          opacity: 0.12 - ringIndex * 0.018,
        }),
      );

      floor.add(ring);
    });

    const particlePositions = [];

    for (let particle = 0; particle < 42; particle += 1) {
      const radius = 1.2 + Math.random() * 2.2;
      const angle = Math.random() * Math.PI * 2;

      particlePositions.push(
        Math.cos(angle) * radius,
        (Math.random() - 0.5) * 2.6,
        Math.sin(angle) * radius * 0.38,
      );
    }

    const particlesGeometry = new THREE.BufferGeometry();

    particlesGeometry.setAttribute(
      'position',
      new THREE.Float32BufferAttribute(particlePositions, 3),
    );

    const particles = new THREE.Points(
      particlesGeometry,
      new THREE.PointsMaterial({
        color: '#00d8df',
        size: 0.018,
        transparent: true,
        opacity: 0.2,
      }),
    );

    scene.add(particles);

    scene.add(new THREE.HemisphereLight('#ffffff', '#08205b', 1.65));

    const keyLight = new THREE.PointLight('#00ffc4', 21, 18, 2);
    keyLight.position.set(4, 4.2, 5.3);
    scene.add(keyLight);

    const rimLight = new THREE.PointLight('#00baff', 19, 16, 2);
    rimLight.position.set(-4, 1.3, 4);
    scene.add(rimLight);

    const frontLight = new THREE.PointLight('#dfffff', 11, 13, 2);
    frontLight.position.set(0, -1.8, 5.2);
    scene.add(frontLight);

    let targetRotationY = -0.18;
    let targetRotationX = -0.08;

    const onPointerMove = event => {
      if (window.innerWidth <= 620) return;

      const rect = mount.getBoundingClientRect();

      const pointerX =
        ((event.clientX - rect.left) / rect.width - 0.5) * 0.38;

      const pointerY =
        ((event.clientY - rect.top) / rect.height - 0.5) * 0.24;

      targetRotationY = -0.18 + pointerX;
      targetRotationX = -0.08 + pointerY;

      /* Movimiento inmediato al puntero */
      rig.rotation.y = targetRotationY;
      rig.rotation.x = targetRotationX;
    };

    const onPointerLeave = () => {
      targetRotationY = -0.18;
      targetRotationX = -0.08;
    };

    mount.addEventListener('pointermove', onPointerMove);
    mount.addEventListener('pointerleave', onPointerLeave);

    const clock = new THREE.Clock();
    let frameId;
    let elapsed = 0;

    const smoothstep = value => value * value * (3 - 2 * value);

    const render = () => {
      const delta = Math.min(clock.getDelta(), 0.05);
      elapsed += delta;

      const time = elapsed;

      const assembleDuration = 2.75;
      const holdDuration = 2.5;
      const disassembleDuration = 2.65;
      const restDuration = 0.85;

      const loop =
        assembleDuration +
        holdDuration +
        disassembleDuration +
        restDuration;

      const phase = time % loop;
      let completion = 0;

      cubies.forEach(
        ({ cubie, target, start, rotation, delay }, cubieIndex) => {
          let progress = 0;

          if (phase < assembleDuration) {
            progress = smoothstep(
              Math.max(
                0,
                Math.min(
                  1,
                  (phase - delay) / (assembleDuration - 0.24),
                ),
              ),
            );
          } else if (phase < assembleDuration + holdDuration) {
            progress = 1;
          } else if (
            phase <
            assembleDuration + holdDuration + disassembleDuration
          ) {
            const local = phase - assembleDuration - holdDuration;

            progress =
              1 -
              smoothstep(
                Math.max(
                  0,
                  Math.min(
                    1,
                    (local - delay * 0.42) /
                      (disassembleDuration - 0.2),
                  ),
                ),
              );
          }

          completion += progress;

          cubie.position.lerpVectors(start, target, progress);

          cubie.rotation.set(
            rotation.x * (1 - progress) +
              Math.sin(time * 0.9 + cubieIndex) * 0.008 * progress,
            rotation.y * (1 - progress) +
              Math.cos(time * 0.85 + cubieIndex) * 0.006 * progress,
            rotation.z * (1 - progress) +
              Math.sin(time + cubieIndex) * 0.006 * progress,
          );

          cubie.scale.setScalar(0.94 + progress * 0.06);
        },
      );

      const assembled = completion / cubies.length;

      logoMaterial.opacity = Math.max(
        0,
        Math.min(1, (assembled - 0.84) / 0.16),
      );

      logoGlow.material.opacity = 0.025 + logoMaterial.opacity * 0.085;

      /* Solo vuelve suavemente al centro al sacar el mouse */
      rig.rotation.y += (targetRotationY - rig.rotation.y) * 0.22;
      rig.rotation.x += (targetRotationX - rig.rotation.x) * 0.22;

      cubeRoot.rotation.y = Math.sin(time * 0.24) * 0.025;
      cubeRoot.rotation.x = Math.sin(time * 0.32) * 0.012;

      rig.position.y = Math.sin(time * 0.45) * 0.035;
      particles.rotation.y = time * 0.006;
      floor.rotation.z = time * 0.018;

      renderer.render(scene, camera);
      frameId = requestAnimationFrame(render);
    };

    const resizeScene = () => {
      const width = Math.max(mount.clientWidth, 1);
      const height = Math.max(mount.clientHeight, 1);
      const isMobile = window.innerWidth <= 620;

      camera.aspect = width / height;
      camera.position.set(0, 0.18, isMobile ? 9.5 : 8.45);
      camera.updateProjectionMatrix();

      cubeRoot.scale.setScalar(isMobile ? 0.87 : 1);
      cubeRoot.position.x = isMobile ? 0 : 0.28;

      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.35));
      renderer.setSize(width, height, false);
    };

    const resizeObserver = new ResizeObserver(resizeScene);

    resizeObserver.observe(mount);
    window.addEventListener('resize', resizeScene);

    resizeScene();
    render();

    return () => {
      cancelAnimationFrame(frameId);

      resizeObserver.disconnect();
      window.removeEventListener('resize', resizeScene);
      mount.removeEventListener('pointermove', onPointerMove);
      mount.removeEventListener('pointerleave', onPointerLeave);

      scene.traverse(object => {
        if (object.geometry) object.geometry.dispose();

        if (object.material) {
          const materials = Array.isArray(object.material)
            ? object.material
            : [object.material];

          materials.forEach(material => {
            if (material.map) material.map.dispose();
            material.dispose();
          });
        }
      });

      renderer.dispose();

      if (renderer.domElement.parentNode === mount) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      className="rubik-scene"
      ref={mountRef}
      aria-label="Cubo EvolCorp que se arma y se desarma"
    />
  );
}

const portfolioProjects = [
  {
    id: 'agroleche',
    name: 'Agroleche',
    category: 'Operación láctea',
    logo: agrolecheLogo,
    summary:
      'Control de recepción, calidad y trazabilidad para una operación láctea más clara.',
    problem:
      'La recepción de leche requería registrar variables de calidad y mantener control sobre una operación crítica.',
    solution:
      'Digitalizamos controles de recepción y calidad para centralizar la información de la operación diaria.',
  },
  {
    id: 'san-andres',
    name: 'Lácteos San Andrés',
    category: 'Compra de leche',
    logo: sanAndresLogo,
    summary:
      'Registro diario de compra de leche con mejor seguimiento de proveedores y entregas.',
    problem:
      'La compra diaria de leche necesitaba más orden para reducir reprocesos y facilitar seguimiento.',
    solution:
      'Organizamos la captura de información de compra y entrega en una experiencia digital más clara.',
  },
  {
    id: 'nogal',
    name: 'El Nogal',
    category: 'Control operativo',
    logo: nogalLogo,
    summary:
      'Información centralizada para consultar rápidamente la operación diaria de compra y control.',
    problem:
      'Los datos de compra y control estaban dispersos y requerían una consulta más ágil.',
    solution:
      'Centralizamos los registros operativos para dar visibilidad rápida al equipo.',
  },
  {
    id: 'villa',
    name: 'La Villa',
    category: 'Trazabilidad',
    logo: laVillaLogo,
    summary:
      'Gestión digital para mejorar la trazabilidad y el control cotidiano en recepción.',
    problem:
      'Los controles manuales de recepción dificultaban mantener información trazable y ordenada.',
    solution:
      'Convertimos la operación cotidiana en una gestión digital más clara y fácil de controlar.',
  },
  {
    id: 'manantial',
    name: 'Compra de Leche El Manantial',
    category: 'Seguimiento de compra',
    logo: manantialLogo,
    summary:
      'Seguimiento ordenado del proceso de compra de leche y consolidación diaria de la información.',
    problem:
      'La información de compra requería consolidación y seguimiento más estructurado.',
    solution:
      'Diseñamos una solución para registrar y acompañar la compra diaria de leche.',
  },
  {
    id: 'vancouver',
    name: 'Vancouver',
    category: 'Gestión educativa y migratoria',
    logo: vancouverLogo,
    summary:
      'Estudiantes, clases, pagos y procesos migratorios conectados en una sola plataforma.',
    problem:
      'La operación requería controlar estudiantes, profesores, clases, pagos y procesos migratorios sin perder trazabilidad.',
    solution:
      'Centralizamos estudiantes, agenda, materiales, pagos, cotizaciones y seguimiento de procesos migratorios.',
  },
  {
    id: 'cda',
    name: 'CDA Farallones de Sutatausa',
    category: 'Servicios automotores',
    logo: cdaLogo,
    summary:
      'Una presencia digital clara para presentar sus servicios de revisión técnico-mecánica.',
    problem:
      'La información de servicios debía ser más clara y accesible para los usuarios del centro.',
    solution:
      'Diseñamos una experiencia digital informativa y confiable para presentar la operación del CDA.',
  },
  {
    id: 'parque',
    name: 'Parque Cementerio Santo Cristo',
    category: 'Operación comercial y contratos',
    logo: parqueLogo,
    summary:
      'Cotizaciones, contratos, inventario y renovaciones centralizados en una sola plataforma.',
    problem:
      'La operación de espacios, ventas, contratos, mantenimientos y renovaciones requería mayor control.',
    solution:
      'Construimos una plataforma para centralizar cotizaciones, ventas, clientes, contratos e inventario de espacios.',
  },
  {
    id: 'dipall',
    name: 'Dipall',
    category: 'Operación, producción y seguridad en alturas',
    logo: dipallLogo,
    summary:
      'Plataforma integral para gestionar cotizaciones, producción, inventario, remisiones y cálculos técnicos de sistemas de seguridad en alturas.',
    problem:
      'La operación requería controlar de forma conectada los clientes, cotizaciones, órdenes de producción, materias primas, despachos, facturación y cálculos técnicos, evitando que la información quedara dispersa entre archivos y procesos manuales.',
    solution:
      'Desarrollamos un sistema de gestión con módulos de clientes, cotizaciones, remisiones, producción, inventario, movimientos, facturas, despachos y reportes. Además, incorporamos una calculadora técnica de líneas de vida con acceso para clientes y generación de informes en PDF.',
  },
  {
    id: 'mina',
    name: 'Mina Australia SAS',
    category: 'Monitoreo de gases y reportes',
    logo: minaLogo,
    summary:
      'Sistema para registrar mediciones de gases dentro de mina y consolidar reportes operativos en Excel.',
    problem:
      'Las mediciones de gases requerían registro constante, control histórico y reportes organizados para facilitar el seguimiento de la operación minera.',
    solution:
      'Construimos una herramienta para capturar mediciones de gases, centralizar los registros y generar reportes en Excel listos para consulta y análisis.',
  },
  {
    id: 'super-cash',
    name: 'Super Cash Medellín',
    category: 'Integración contable y facturación',
    logo: superCashLogo,
    summary:
      'Plataforma de integración con Siigo para validar y procesar información contable y comercial desde archivos Excel.',
    problem:
      'La información de ventas, soportes y movimientos contables llegaba en archivos con formatos distintos, lo que generaba correcciones manuales, reprocesos y riesgos antes de cargarla al sistema contable.',
    solution:
      'Construimos un panel privado que autentica la conexión con Siigo, separa cada flujo de carga, previsualiza los archivos, detecta errores y permite corregir la información antes de enviarla.',
  },
  {
    id: 'gestionar',
    name: 'Gestionar Ltda.',
    category: 'Certificados tributarios y operación empresarial',
    logo: gestionarLogo,
    summary:
      'Ecosistema privado y público para solicitar, gestionar, validar y descargar certificados de retención, conectado con herramientas internas de operación.',
    problem:
      'La gestión de certificados, solicitudes y documentos requería atender consultas, aprobar entregas y mantener trazabilidad sin depender de correos, seguimiento manual o información dispersa.',
    solution:
      'Construimos un portal público para crear solicitudes, consultar estados y descargar certificados, junto con un back office con usuarios, roles, empresas, documentos PDF, notificaciones y control de solicitudes. Además, incorporamos módulos internos para clientes, ventas, cotizaciones, inventario y consulta de documentos DIAN.',
  },
  {
    id: 'leon-asociados',
    name: 'León Asociados',
    category: 'Votaciones internas',
    logo: leonLogo,
    summary:
      'Aplicación de escritorio para organizar candidatos, habilitar elecciones y consolidar resultados de procesos internos.',
    problem:
      'Los procesos de votación internos requerían una herramienta más ordenada, controlada y fácil de administrar, sin depender de registros manuales.',
    solution:
      'Desarrollamos una aplicación para gestionar candidatos, abrir y cerrar votaciones, registrar votos y consultar resultados de forma clara y centralizada.',
  },
  {
    id: 'gimnasio-adn',
    name: 'Gimnasio ADN',
    category: 'Gestión de miembros y mensualidades',
    logo: gimnasioLogo,
    summary:
      'Sistema para registrar usuarios, controlar mensualidades y consultar rápidamente quién está al día o tiene pagos pendientes.',
    problem:
      'El gimnasio necesitaba tener un registro organizado de sus usuarios y controlar los pagos mensuales sin depender de listas manuales o revisiones dispersas.',
    solution:
      'Desarrollamos una plataforma para registrar usuarios, gestionar mensualidades, identificar pagos pendientes y mantener el historial de cada cliente en un solo lugar.',
  },
  {
    id: 'hedmont-lopez',
    name: 'Hedmont López',
    category: 'Soluciones migratorias',
    logo: hedmontLogo,
    summary:
      'Solución digital para presentar servicios migratorios, orientar solicitudes y organizar el seguimiento de cada proceso.',
    problem:
      'Los procesos migratorios requieren información clara, recolección ordenada de datos y seguimiento constante para que cada persona entienda sus requisitos y avance sin perder etapas importantes.',
    solution:
      'Desarrollamos una experiencia digital para centralizar la presentación de servicios migratorios, recibir solicitudes iniciales, organizar la información de cada caso y facilitar el acompañamiento durante el proceso.',
  },
];

const featuredCaseIds = ['agroleche', 'vancouver', 'parque', 'dipall', 'mina'];

const problemItems = [
  ['Procesos lentos y manuales', Clock3],
  ['Falta de visibilidad y control', AlertTriangle],
  ['Sistemas que no se integran', Puzzle],
  ['Dificultad para escalar', TrendingUp],
];

const solutionItems = [
  'Automatizamos tareas repetitivas y reducimos fricción operativa.',
  'Centralizamos información para que el equipo tenga claridad.',
  'Diseñamos soluciones pensadas para la forma real de trabajar.',
  'Acompañamos la implementación hasta dejarla lista para operar.',
];

const services = [
  [
    'Software a la medida',
    'Creamos soluciones digitales que se adaptan a tu operación, tus usuarios y la forma real en que trabaja tu equipo.',
    MonitorSmartphone,
  ],
  [
    'Automatización de procesos',
    'Reducimos tareas manuales, conectamos pasos operativos y eliminamos reprocesos que consumen tiempo.',
    Zap,
  ],
  [
    'Inteligencia artificial aplicada',
    'Integramos modelos de IA para clasificar información, asistir equipos, automatizar respuestas y convertir datos en acciones útiles.',
    BrainCircuit,
  ],
  [
    'Apps y portales',
    'Desarrollamos experiencias web y móviles para equipos internos, clientes, usuarios de campo y procesos comerciales.',
    Smartphone,
  ],
  [
    'Integración de operación',
    'Unimos datos, módulos y flujos para que toda la operación funcione como un sistema conectado y claro.',
    Workflow,
  ],
];

const process = [
  ['01', 'Diagnóstico', 'Entendemos el proceso real, los usuarios y lo que hoy necesita mejorar.'],
  ['02', 'Diseño', 'Definimos una experiencia clara, módulos y flujos pensados para operar.'],
  ['03', 'Construcción', 'Desarrollamos la solución y conectamos lo necesario para ponerla a funcionar.'],
  ['04', 'Entrega', 'Probamos, ajustamos y acompañamos el paso a una operación digital más ordenada.'],
];

function Header() {
  const [open, setOpen] = useState(false);

  const links = [
    ['Servicios', '#servicios'],
    ['Proyectos', '#proyectos'],
    ['Nosotros', '#nosotros'],
    ['Proceso', '#proceso'],
    ['Casos', '#casos'],
    ['Contacto', '#contacto'],
  ];

  return (
    <header className="site-header">
      <a className="brand" href="#inicio" aria-label="EvolCorp inicio">
        <img src={logoBlue} alt="EvolCorp" />
      </a>

      <nav>
        {links.map(([label, href]) => (
          <a key={label} href={href}>
            {label}
          </a>
        ))}
      </nav>

      <a className="btn btn-gradient nav-cta" href={WA} target="_blank" rel="noreferrer">
        Cotizar proyecto <ArrowRight size={16} />
      </a>

      <button className="menu" onClick={() => setOpen(true)} aria-label="Abrir menú">
        <Menu size={22} />
      </button>

      {open && (
        <div className="mobile-menu">
          <button onClick={() => setOpen(false)} aria-label="Cerrar menú">
            <X />
          </button>

          {links.map(([label, href]) => (
            <a key={label} onClick={() => setOpen(false)} href={href}>
              {label}
            </a>
          ))}

          <a className="btn btn-gradient" href={WA} target="_blank" rel="noreferrer">
            Cotizar proyecto <ArrowRight size={16} />
          </a>
        </div>
      )}
    </header>
  );
}

function Hero() {
  return (
    <section id="inicio" className="hero full-bleed">
      <div className="hero-left" data-reveal>
        <h1>
          Software que <span>ordena</span> lo que hoy te quita tiempo.
        </h1>

        <p>
          Convertimos procesos dispersos en productos digitales claros,
          confiables y listos para operar todos los días.
        </p>

        <div className="hero-actions">
          <a className="btn btn-gradient" href="#proyectos">
            Ver proyectos <ArrowRight size={16} />
          </a>

          <a
            className="btn btn-soft"
            href={WA}
            target="_blank"
            rel="noreferrer"
          >
            Hablemos de tu proceso
          </a>
        </div>
      </div>

      <div className="hero-right" data-reveal>
        <RubikCubeScene />
      </div>
    </section>
  );
}

function OverviewCards() {
  return (
    <section className="overview full-bleed" data-reveal>
      <article className="overview-card problem-card">
        <img src={person1} alt="Ilustración de análisis" />

        <div>
          <span className="tag">EL PROBLEMA</span>
          <h2>Sabemos lo que <strong>te detiene.</strong></h2>

          <ul>
            {problemItems.map(([label, Icon]) => (
              <li key={label}>
                <Icon size={18} /> {label}
              </li>
            ))}
          </ul>
        </div>
      </article>

      <article className="overview-card solution-card">
        <img src={modulo2} alt="Módulos conectados" />

        <div>
          <span className="tag green">NUESTRA SOLUCIÓN</span>
          <h2>Creamos tecnología que <strong>impulsa resultados.</strong></h2>

          <ul>
            {solutionItems.map(label => (
              <li key={label}>
                <CheckCircle2 size={18} /> {label}
              </li>
            ))}
          </ul>
        </div>
      </article>

      <article className="overview-card build-card">
        <div>
          <span className="tag cyan">LO QUE CONSTRUIMOS</span>
          <h2>Productos digitales para <strong>operar mejor.</strong></h2>
          <p>
            Sistemas internos, portales, aplicaciones de campo, procesos
            comerciales, reportes y experiencias para equipos y clientes.
          </p>
        </div>
      </article>
    </section>
  );
}

function Metrics() {
  const values = [
    ['A medida', 'Cada solución parte de una necesidad real.', ShieldCheck],
    ['Conectado', 'Procesos y equipos en una sola experiencia.', Workflow],
    ['Claro', 'Información útil para seguir y decidir.', LayoutDashboard],
    ['Acompañado', 'Implementación pensada para operar de verdad.', CheckCircle2],
  ];

  return (
    <section className="metrics full-bleed" data-reveal>
      {values.map(([title, text, Icon]) => (
        <article key={title}>
          <Icon />
          <strong>{title}</strong>
          <span>{text}</span>
        </article>
      ))}
    </section>
  );
}

function Services() {
  return (
    <section id="servicios" className="section full-bleed">
      <div className="section-head" data-reveal>
        <span className="tag">SERVICIOS</span>
        <h2>Construimos tecnología útil para resolver una operación real.</h2>
      </div>

      <div className="service-grid">
        {services.map(([title, text, Icon]) => (
          <article className="service-card" key={title} data-reveal>
            <Icon />
            <h3>{title}</h3>
            <p>{text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function Portfolio() {
  const [activeId, setActiveId] = useState(portfolioProjects[0].id);

  const activeProject = useMemo(
    () =>
      portfolioProjects.find(project => project.id === activeId) ||
      portfolioProjects[0],
    [activeId],
  );

  useEffect(() => {
    const rotationTimer = window.setTimeout(() => {
      setActiveId(currentId => {
        const currentIndex = portfolioProjects.findIndex(
          project => project.id === currentId,
        );

        const nextIndex =
          currentIndex >= portfolioProjects.length - 1
            ? 0
            : currentIndex + 1;

        return portfolioProjects[nextIndex].id;
      });
    }, 5000);

    return () => window.clearTimeout(rotationTimer);
  }, [activeId]);

  const handleProjectClick = projectId => {
    setActiveId(projectId);
  };

  return (
    <section
      id="proyectos"
      className="section full-bleed soft-panel portfolio-section"
    >
      <div className="section-head" data-reveal>
        <h2>Proyectos que partieron de problemas concretos.</h2>
        <p>
          Selecciona una organización para ver el enfoque de la solución que
          construimos.
        </p>
      </div>

      <div className="portfolio-layout" data-reveal>
        <div
          className="portfolio-logo-grid"
          role="tablist"
          aria-label="Proyectos EvolCorp"
        >
          {portfolioProjects.map(project => (
            <button
              className={`portfolio-logo-card ${
                project.id === activeProject.id ? 'is-active' : ''
              }`}
              key={project.id}
              type="button"
              onClick={() => handleProjectClick(project.id)}
              aria-pressed={project.id === activeProject.id}
            >
              <span className="portfolio-logo-frame">
                <img src={project.logo} alt={project.name} />
              </span>

              <span>{project.name}</span>
            </button>
          ))}
        </div>

        <aside
          className="portfolio-detail portfolio-detail-transition"
          key={activeProject.id}
        >
          <img src={activeProject.logo} alt="" aria-hidden="true" />
          <span className="tag cyan">{activeProject.category}</span>
          <h3>{activeProject.name}</h3>
          <p className="portfolio-summary">{activeProject.summary}</p>

          <div className="portfolio-detail-row">
            <b>Reto</b>
            <p>{activeProject.problem}</p>
          </div>

          <div className="portfolio-detail-row">
            <b>Respuesta EvolCorp</b>
            <p>{activeProject.solution}</p>
          </div>
        </aside>
      </div>
    </section>
  );
}



function Process() {
  return (
    <section id="proceso" className="section full-bleed process-section">
      <div className="section-head center" data-reveal>
        <span className="tag">PROCESO</span>
        <h2>Una ruta clara desde el problema hasta una solución lista para operar.</h2>
      </div>

      <div className="process-grid">
        {process.map(([number, title, text]) => (
          <article key={number} data-reveal>
            <span>{number}</span>
            <h3>{title}</h3>
            <p>{text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function Benefits() {
  const benefits = [
    'Menos tareas repetitivas y más foco en lo importante.',
    'Información ordenada para tomar decisiones con claridad.',
    'Procesos conectados en una sola experiencia.',
    'Acompañamiento hasta que la solución esté lista para operar.',
  ];

  return (
    <section className="section full-bleed benefits-section">
      <div className="benefit-list" data-reveal>
        {benefits.map(item => (
          <article key={item}>
            <CheckCircle2 size={19} />
            <span>{item}</span>
          </article>
        ))}
      </div>

      <div data-reveal>
        <span className="tag green">RESULTADOS</span>
        <h2>Clásico en lo visual. Innovador en la forma de resolver.</h2>
        <p>
          La tecnología debe sentirse simple para quien la usa y poderosa para
          quien toma decisiones.
        </p>
      </div>
    </section>
  );
}

function Team() {
  const teamMembers = [
    {
      order: '02',
      name: 'Julian Santiago Nieto Murcia',
      label: 'DIRECCIÓN DE PROYECTOS',
      role: 'Líder de Proyectos y Desarrollo Full Stack',
      description:
        'Dirige iniciativas digitales desde el levantamiento de necesidades hasta la entrega. Integra desarrollo front-end y back-end, mejora de producto y acompañamiento a clientes.',
      photo: julianPhoto,
      tags: ['Proyecto', 'Front-end', 'Back-end'],
    },
    {
      order: '01',
      name: 'Deyvid Adrian Jimenez Salazar',
      label: 'ESTRATEGIA Y NEGOCIO',
      role: 'Fundador y Director de Estrategia & Desarrollo',
      description:
        'Lidera la visión de EvolCorp, la relación comercial y el inicio de nuevos proyectos. Conecta necesidades de negocio con soluciones digitales y participa directamente en su desarrollo.',
      photo: deyvidPhoto,
      tags: ['Estrategia', 'Clientes', 'Desarrollo'],
      featured: true,
    },
    {
      order: '03',
      name: 'Bradley Jeffrey Ballen Jola',
      label: 'INGENIERÍA DE PRODUCTO',
      role: 'Líder de Ingeniería Full Stack',
      description:
        'Construye soluciones digitales de punta a punta, conectando interfaces, lógica de negocio, datos y servicios para que cada producto opere de manera sólida y eficiente.',
      photo: bradleyPhoto,
      tags: ['Arquitectura', 'Front-end', 'Back-end'],
    },
  ];

  return (
    <section id="nosotros" className="team-section full-bleed">
      <div className="team-heading" data-reveal>
        <div>
          <span className="tag green">NOSOTROS</span>

          <h2>Tres perfiles. Una misma forma de construir soluciones que funcionan.</h2>
        </div>

        <div className="team-heading-copy">
          <p>
            En EvolCorp unimos estrategia, dirección de proyectos y desarrollo
            full stack para convertir necesidades reales en productos digitales
            claros, confiables y listos para operar.
          </p>

          <span className="team-proof">
            <strong>+50</strong> proyectos digitales desarrollados
          </span>
        </div>
      </div>

      <div className="team-grid">
        {teamMembers.map(member => (
          <article
            className={`team-card ${member.featured ? 'is-featured' : ''}`}
            key={member.name}
            data-reveal
          >
            <div className="team-photo">
              <span className="team-order">{member.order}</span>
              <span className="team-ring" />
              <img src={member.photo} alt={member.name} />
            </div>

            <div className="team-info">
              <span className="team-label">{member.label}</span>
              <h3>{member.name}</h3>
              <p className="team-role">{member.role}</p>
              <p className="team-description">{member.description}</p>

              <div className="team-tags">
                {member.tags.map(tag => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contacto" className="cta full-bleed" data-reveal>
      <div className="cta-copy">
        <span className="tag green">HABLEMOS DE TU PROYECTO</span>

        <h2>
          Cuéntanos qué quieres mejorar y lo convertimos en producto digital.
        </h2>

        <p>
          Conversemos sobre tu operación, tus usuarios y la solución que puede
          ayudarte a trabajar mejor.
        </p>

        <div className="cta-actions">
          <a
            className="btn btn-dark"
            href={WA}
            target="_blank"
            rel="noreferrer"
          >
            Escribir por WhatsApp <ArrowRight size={16} />
          </a>
        </div>
      </div>

      <div className="cta-characters" aria-hidden="true">
        <span className="cta-orbit cta-orbit-one" />
        <span className="cta-orbit cta-orbit-two" />

        <img
          className="cta-character cta-character-planner"
          src={person1}
          alt=""
        />

        <img
          className="cta-character cta-character-analyst"
          src={person2}
          alt=""
        />

        <img
          className="cta-character cta-character-builder"
          src={person3}
          alt=""
        />

        <img
          className="cta-character cta-character-guide"
          src={person4}
          alt=""
        />
      </div>
    </section>
  );
}

function WhatsAppFloat() {
  return (
    <a
      className="whatsapp-float"
      href={WA}
      target="_blank"
      rel="noreferrer"
      aria-label="Escribir por WhatsApp"
    >
      <FaWhatsapp size={30} />
    </a>
  );
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="full-bleed footer-wrap">
       

        <div className="footer-main" data-reveal>
          <div className="footer-brand-block">
            <a
              className="footer-logo"
              href="#inicio"
              aria-label="Volver al inicio de EvolCorp"
            >
              <img src={logoDark} alt="EvolCorp" />
            </a>

            <p>
              Software a la medida para ordenar procesos, conectar equipos y
              convertir operaciones reales en productos digitales útiles.
            </p>

            
          </div>

          <div className="footer-link-group">
            <span>EXPLORA</span>

            <a href="#servicios">Servicios</a>
            <a href="#proyectos">Proyectos</a>
            <a href="#nosotros">Nosotros</a>
            <a href="#casos">Casos destacados</a>
            <a href="#proceso">Nuestro proceso</a>
          </div>

          <div className="footer-link-group footer-contact-links">
            <span>HABLEMOS</span>

            <a href="#contacto">Cuéntanos tu idea</a>

            <a href={WA} target="_blank" rel="noreferrer">
              <FaWhatsapp size={17} />
              WhatsApp
            </a>

            <a href={WA} target="_blank" rel="noreferrer">
              Cotizar un proyecto
              <ArrowRight size={15} />
            </a>
          </div>
        </div>

        <div className="footer-bottom">
          <p>
            © {new Date().getFullYear()} EvolCorp. Software a la medida.
          </p>

          <a href="#inicio">
            Volver arriba <span>↑</span>
          </a>
        </div>
      </div>
    </footer>
  );
}

function App() {
  useReveal();

  return (
    <>
      <Header />

      <main>
        <Hero />
        <OverviewCards />
        <Metrics />
        <Services />
        <Portfolio />
       
        <Process />
        <Benefits />
        <Team />
        <Contact />
      </main>

      <Footer />
      <WhatsAppFloat />
    </>
  );
}

createRoot(document.getElementById('root')).render(<App />);