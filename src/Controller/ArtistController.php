<?php

namespace App\Controller;

use App\Entity\Artist;
use App\Repository\ArtistRepository;
use App\Service\FileUploader;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\File\UploadedFile;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\Exception\NotEncodableValueException;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\String\Slugger\SluggerInterface;
use Symfony\Component\Validator\Validator\ValidatorInterface;

#[Route('/api/artist', name: 'app_artist_')]
class ArtistController extends AbstractController
{
    #[Route('', name: 'index', methods: ['GET'])]
    public function index(ArtistRepository $artistRepository): Response
    {
        return $this->json($artistRepository->findBy([], ['name' => 'ASC']), 200, [], ['groups' => 'artist:read']);
    }

    #[Route('', name: 'add', methods: ['POST'])]
    public function add(Request $request, FileUploader $fileUploader, ValidatorInterface $validator, SluggerInterface $slugger, ArtistRepository $artistRepository): Response
    {
        $artist = new Artist();

        try {
            $artist->setName($request->get('name'));

            /** @var UploadedFile $coverFile */
            $coverFile = $request->files->all();

            if ($coverFile) {
                $fileName = $fileUploader->upload($coverFile['cover'], $this->getParameter('upload_img_artist'), $slugger->slug($artist->getName()));
                $artist->setCover($fileName);
            }

            $errors = $validator->validate($artist);
            if (count($errors) > 0) {
                return $this->json($errors, 400);
            }

            $artistRepository->add($artist);

            return $this->json($artist, 201);
        } catch (NotEncodableValueException $e) {
            return $this->json(['status' => 400, 'message' => $e->getMessage()], 400);
        }
    }

    #[Route('/{slug}', name: 'edit', methods: ['POST'])]
    public function edit(Request $request, ValidatorInterface $validator, FileUploader $fileUploader, SluggerInterface $slugger, ArtistRepository $artistRepository, Artist $artist): Response
    {
        try {
            $artist->setName($request->get('name'));

            /** @var UploadedFile $coverFile */
            $coverFile = $request->files->all();

            if ($coverFile) {
                if ($artist->getCover()) {
                    $fileUploader->delete($this->getParameter('upload_img_artist'), $artist->getCover());
                }
                $fileName = $fileUploader->upload($coverFile['cover'], $this->getParameter('upload_img_artist'), $slugger->slug($artist->getName()));
                $artist->setCover($fileName);
            }

            $errors = $validator->validate($artist);
            if (count($errors) > 0) {
                return $this->json($errors, 400);
            }

            $artistRepository->add($artist);

            return $this->json($artist, 200);
        } catch (NotEncodableValueException $e) {
            return $this->json(['status' => 400, 'message' => $e->getMessage()], 400);
        }
    }

    #[Route('/{slug}', name: 'show', methods: ['GET'])]
    public function show(Artist $artist): Response
    {
        return $this->json($artist, 200, [], ['groups' => 'artist:read']);
    }

    #[Route('/{slug}', name: 'delete', methods: ['DELETE'])]
    public function delete(ArtistRepository $artistRepository, FileUploader $fileUploader, Artist $artist): Response
    {
        if ($artist->getCover()) {
            $fileUploader->delete($this->getParameter('upload_img_artist'), $artist->getCover());
        }
        $artistRepository->remove($artist);

        return $this->json(['Artist was deleted'], 200);
    }
}
